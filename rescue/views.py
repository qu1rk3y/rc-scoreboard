from django.shortcuts import render_to_response, get_object_or_404, redirect
from annoying.decorators import render_to
from django.contrib.auth.decorators import login_required
from rescue.models import (Competition, Group, Team, Performance,
        NewEventForm, NewTeamForm)
from django.core.context_processors import csrf
from django.contrib import messages

@render_to('rescue/index_rescue.html')
def index_rescue(request):
    competitions = Competition.objects.all()
    return {'user': request.user, 'competitions': competitions}


# competition/s
@render_to('rescue/competition.html')
@login_required(login_url='/login/')
def competition(request, competition_id):
    competition = get_object_or_404(Competition, pk=competition_id)
    groups = competition.groups.all()
    return {'competition': competition, 'groups': groups}

@render_to('rescue/competitions.html')
@login_required(login_url='/login/')
def competitions(request):
    competitions = Competition.objects.all()
    return {'competitions': competitions}

@render_to('rescue/competition/new.html')
@login_required(login_url='/login/')
def new_competition(request):
    if request.method == 'POST':
        form = NewEventForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            competition = Competition(name=name)
            competition.save()

            msg = "New competition {0} has been created!".format(name)
            messages.success(request, msg)

            return redirect('rescue.views.competition', str(competition.id))
    else:
        form = NewEventForm()
        c = {}
        c.update(csrf(request))
        c['form'] = form
        return c

# group/s
@render_to('rescue/group.html')
@login_required(login_url='/login/')
def group(request, group_id):
    group = get_object_or_404(Group, pk=group_id)
    teams = group.teams.all()
    competition = group.competition_set.all()[0]
    performances = group.performances.all()

    return {'group': group, 'teams': teams,
            'competition': competition,
            'performances': performances}

@render_to('rescue/groups.html')
@login_required(login_url='/login/')
def groups(request):
    groups = Group.objects.all()
    return {'groups': groups}

@render_to('rescue/group/new.html')
@login_required(login_url='/login/')
def new_group(request):
    competition = None
    if 'competition' in request.GET:
        competition = get_object_or_404(Competition, pk=int(request.GET['competition']))
    if request.method == 'POST':
        form = NewEventForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            group = Group(name=name)
            group.save()

            competition.groups.add(group)
            competition.save()

            msg = "New group {0} has been created!".format(name)
            messages.success(request, msg)

            return redirect('rescue.views.group', str(group.id))
    else:
        form = NewEventForm()
        c = {}
        c.update(csrf(request))
        c['form'] = form

        if competition:
            c['competition'] = competition
        else:
            c['competitions'] = Competition.objects.all()
 
        return c

# team/s
@render_to('rescue/teams.html')
@login_required(login_url='/login/')
def teams(request):
    teams = Team.objects.all()
    return {'teams': teams}

@render_to('rescue/team.html')
@login_required(login_url='/login/')
def team(request, team_id):
    team = get_object_or_404(Team, pk=team_id)
    group = team.group_set.all()[0]
    competition = group.competition_set.all()[0]

    performances = Performance.objects.filter(team=team).order_by('playing')
    performed = Performance.objects.filter(team=team, playing='D').count()

    return {'group': group, 'competition': competition,
            'team': team, 'performances': performances, 'performed': performed}

@render_to('rescue/team/new.html')
@login_required(login_url='/login/')
def new_team(request):
    if 'group' in request.GET:
        group = get_object_or_404(Group, pk=int(request.GET['group']))
        competition = group.competition_set.all()[0]
    if request.method == 'POST':
        form = NewTeamForm(request.POST)
        if form.is_valid():
            teams = form.cleaned_data['names']
            teams = teams.replace('\r', "")
            teams = teams.split('\n')
            
            for t in teams:
                team = Team(name=t)
                team.save()
                group.teams.add(team)
            
            group.save()

            msg = "Teams for group {0} has been created!".format(group.name)
            messages.success(request, msg)

            return redirect('rescue.views.group', str(group.id))
    else:
        form = NewTeamForm()
        c = {}
        c.update(csrf(request))
        c['form'] = form
        c['group'] = group
        c['competition'] = competition
        return c

#results
@render_to('rescue/results/live.html')
def results_live(request):
    if 'competition' in request.GET:
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

@render_to('rescue/performances/generate.html')
@login_required(login_url='/login/')
def performances_generate(request, group_id):
    group = get_object_or_404(Group, pk=group_id)
    competition = group.competition_set.all()[0]

    return {'group': group, 'competition': competition}

@render_to('rescue/performances/generate_listing.html')
def performances_generate_listing(request):
    group = get_object_or_404(Group, pk=request.POST['group_id'])
    teams = list(group.teams.all())

    for team in teams:
        performance = Performance(team=team, referee=request.user)
        performance.save()
        group.performances.add(performance)
    
    group.actual_round = 1

    group.save()

    performances = group.performances.all()
    return {'performances': performances}

