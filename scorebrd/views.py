# Create your views here.
from django.shortcuts import render_to_response, get_object_or_404, redirect
from scorebrd.models import (Team, Event, Group, Competition, LoginForm, Match,
        TeamResult, MatchSaveForm)
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf
from django.template import RequestContext
from annoying.decorators import render_to
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

# code from
# http://code.activestate.com/recipes/65200-round-robin-pairings-generator/
def round_robin(units, sets=None):
    """ Generates a schedule of "fair" pairings from a list of units """
    if len(units) % 2:
        units.append(None)
    count    = len(units)
    sets     = sets or (count - 1)
    half     = count / 2
    schedule = []
    for turn in range(sets):
        pairings = []
        for i in range(half):
            if units[i] is None or units[count-i-1] is None:
                continue
            pairings.append((units[i], units[count-i-1]))
        units.insert(1, units.pop())
        schedule.append(pairings)
    return schedule

@render_to('login.html')
def my_login(request, url='/'):
    
    if 'next' in request.POST:
        url = request.POST['next']
    
    def errorHandle(error):
        form = LoginForm()
        c = {}
        c.update(csrf(request))
        c['form'] = form
        c['error'] = error
        return c

    if request.user.is_authenticated():
        return redirect(url)

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid(): 
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    # Redirect to a success page.
                    login(request, user)
                    return redirect(url)
            else:
                error = u'Invalid login'
                return errorHandle(error)	
        else:
            return errorHandle(u'Invalid login')
    else:
        form = LoginForm()
        c = {}
        c.update(csrf(request))
        c['form'] = form
        return c

def my_logout(request):
    if request.user.is_authenticated():
        logout(request)       
        
    return redirect('index')

@render_to('results_live.html')
def results_live(request):
    groups = Group.objects.all()
    events = Event.objects.all()
    return {'groups': groups, 'event': events}

# event/s
@render_to('events.html')
@login_required(login_url='/login/')
def events(request):
    events = Event.objects.all()
    return {'events': events}

@render_to('event.html')
@login_required(login_url='/login/')
def event(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    competitions = event.competitions.all()
    return {'event': event, 'competitions': competitions}

# competition/s
@render_to('competition.html')
@login_required(login_url='/login/')
def competition(request, competition_id):
    competition = get_object_or_404(Competition, pk=competition_id)
    groups = competition.groups.all()
    event = competition.event_set.all()[0]
    return {'event': event, 'competition': competition, 'groups': groups}

@render_to('competitions.html')
@login_required(login_url='/login/')
def competitions(request):
    competitions = Competition.objects.all()
    return {'competitions': competitions}

# group/s
@render_to('group.html')
@login_required(login_url='/login/')
def group(request, group_id):
    group = get_object_or_404(Group, pk=group_id)
    teams = group.teams.all()
    competition = group.competition_set.all()[0]
    event = competition.event_set.all()[0]
    team_results = group.results.all()\
                    .order_by('matches_played').reverse()
    matches = group.matches.all().order_by('playing')
    return {'group': group, 'teams': teams,
            'competition': competition, 'event': event, 
            'matches': matches,
            'team_results': team_results}

@render_to('groups.html')
@login_required(login_url='/login/')
def groups(request):
    groups = Group.objects.all()
    return {'groups': groups}

# team/s
@render_to('teams.html')
@login_required(login_url='/login/')
def teams(request):
    teams = Team.objects.all()
    return {'teams': teams}

@render_to('team.html')
@login_required(login_url='/login/')
def team(request, team_id):
    team = get_object_or_404(Team, pk=team_id)
    group = team.group_set.all()[0]
    competition = group.competition_set.all()[0]
    event = competition.event_set.all()[0]
    from itertools import chain

    matches = list(chain(Match.objects.filter(teamA=team).order_by('playing'),
            Match.objects.filter(teamB=team).order_by('playing')))
    played = Match.objects.filter(teamA=team, playing='D').count() + \
            Match.objects.filter(teamB=team, playing='D').count()

    return {'group': group, 'competition': competition, 'event': event,
            'team': team, 'matches': matches, 'played': played}

@render_to('index.html')
def index(request):
    events = Event.objects.all()
    matches = Match.objects.all()
    return {'user': request.user, 'events': events, 'matches': matches}

@render_to('matches/generate.html')
@login_required(login_url='/login/')
def matches_generate(request, group_id=None):
    group = get_object_or_404(Group, pk=group_id)
    competition = group.competition_set.all()[0]
    return {'group': group, 'competition': competition}

@render_to('matches/generate_listing.html')
def matches_generate_listing(request):
    group = get_object_or_404(Group, pk=request.POST['group_id'])
    teams = list(group.teams.all())

    for team in teams:
        result = TeamResult(team=team)
        result.save()
        group.results.add(result)

    matches = []
    schedule = round_robin(teams)
    for round in schedule:
        for teams in round:
            match = Match(teamA=teams[0], teamB=teams[1], referee=request.user)
            match.save()
            group.matches.add(match)
            matches.append(match)
    return {'matches': matches}


@login_required(login_url='/login/')
@csrf_exempt
def match_play(request, match_id):
    match = get_object_or_404(Match, pk=match_id)
    if request.POST:
        scoreA = request.POST.get('scoreA', None)
        scoreB = request.POST.get('scoreB', None)
        if scoreA and scoreB:
            match.scoreA = int(scoreA)
            match.scoreB = int(scoreB)
            match.playing = 'P'

            match.save()

        return HttpResponse('{ok: true}', mimetype="application/json") 
       
    return render_to_response('matches/play.html',
                              {'match': match, 'match_id': match_id},
                              context_instance=RequestContext(request))

@render_to('matches/save.html')
@login_required(login_url='/login/')
def match_save(request, match_id):

    #TODO: Django messages
    
    def errorHandle(error, request, scoreA, scoreB, match_id):
        form = MatchSaveForm(request.POST, initial={'scoreA': scoreA, 'scoreB': scoreB})
        c = {}
        c.update(csrf(request))
        c['form'] = form
        c['error'] = error
        c['match_id'] = match_id
        return c
    
    def authorize_and_save(request):
        username = request.user
        password = request.POST['password']
        scoreA = request.POST['scoreA']
        scoreB = request.POST['scoreB']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                match = get_object_or_404(Match, pk=match_id)
                match.scoreA = scoreA
                match.scoreB = scoreB
                match.playing = 'D'
                match.save()
                return True
        return errorHandle('Invalid login', request, scoreA, scoreB, match_id)

    if request.method == 'POST':
        if 'final' in request.POST:
            res = authorize_and_save(request)
            if res is True:
                return redirect('index')
            else:
                return res
        else:
            form = MatchSaveForm(request.POST)
            if form.is_valid(): 
                res = authorize_and_save(request)
                if res is True:
                    return redirect('index')
                else:
                    return res
            else:
                return errorHandle(u'Invalid login')
    else:
        return {'error': "How on earth did you get here?"}

@render_to('results/live.html')
def results_live(request):
    if 'event' in request.GET:
        event = get_object_or_404(Event, pk=request.GET['event'])
        return {'event': event, 'event_only': True}

    elif 'competition' in request.GET:
        competition = get_object_or_404(Competition, pk=request.GET['competition'])
        event = competition.event_set.all()[0]
        return {'event': event, 'competition': competition,
                'competition_only': True}

    elif 'group' in request.GET:
        group = get_object_or_404(Group, pk=request.GET['group'])
        competition = group.competition_set.all()[0]
        event = competition.event_set.all()[0]
        return {'event': event, 'competition': competition,
                'group': group, 'group_only': True}

    else:
        return {'events': Event.objects.all()}

def results(request):
    pass

def results_team_view(request, team_id):
    pass

@render_to('results/group.html')
@login_required(login_url='/login/')
def results_group_view(request, group_id):
    group = get_object_or_404(Group, pk=group_id)
    teams = group.teams.all()
    competition = group.competition_set.all()[0]
    event = competition.event_set.all()[0]
    team_results = TeamResult.objects.filter(group__id=group.id)
    return {'group': group, 'teams': teams,
            'competition': competition, 'event': event, 
            'team_results': team_results}

@render_to('results/match.html')
@login_required(login_url='/login/')
def results_match_view(request, match_id):
    match = get_object_or_404(Match, pk=match_id)

    group = match.group_set.all()[0]
    competition = group.competition_set.all()[0]
    event = competition.event_set.all()[0]
    return {'group': group, 'match': match,
            'competition': competition, 'event': event}
