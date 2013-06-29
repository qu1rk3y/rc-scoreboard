// maze datastore
var maze;
// explored set
var explored = Array();
// square reference to jQuery object
var squares = Array();

// converts a square number to a coordinate set (x, y, z)
// x = 0 : lower floor, x = 1 : ramp, x = 2 : top floor
function getCoordFromSquare(squareNum) {
    switch(squareNum) {
        case 0:
            return [0, 0, 0];
        	break;
        case 1:
            return [0, 1, 0];
        	break;
        case 2:
            return [0, 2, 0];
        	break;
        case 3:
            return [0, 3, 0];
        	break;
        case 4:
            return [0, 0, 1];
        	break;
        case 5:
            return [0, 1, 1];
        	break;
        case 6:
            return [0, 2, 1];
        	break;
        case 7:
            return [0, 3, 1];
        	break;
        case 8:
            return [0, 0, 2];
        	break;
        case 9:
            return [0, 1, 2];
        	break;
        case 10:
            return [0, 2, 2];
        	break;
        case 11:
            return [0, 3, 2];
        	break;
        case 12:
            return [0, 0, 3];
        	break;
        case 13:
            return [0, 1, 3];
        	break;
        case 14:
            return [0, 2, 3];
        	break;
        case 15:
            return [0, 3, 3];
        	break;
        case 16:
            return [0, 0, 4];
        	break;
        case 17:
            return [0, 1, 4];
        	break;
        case 18:
            return [0, 2, 4];
        	break;
        case 19:
            return [0, 3, 4];
        	break;
        case 20:
            return [0, 0, 5];
        	break;
        case 21:
            return [0, 1, 5];
        	break;
        case 22:
            return [0, 2, 5];
        	break;
        case 23:
            return [0, 3, 5];
        	break;
        case 24:
            // RAMP 0
            return [1, 0, 0];
        	break;
        case 25:
            return [0, 0, 6];
        	break;
        case 26:
            return [0, 1, 6];
        	break;
        case 27:
            return [0, 2, 6];
        	break;
        case 28:
            return [0, 3, 6];
        	break;
        case 29:
            // RAMP 1
            return [1, 0, 1];
        	break;
        case 30:
            return [0, 0, 7];
        	break;
        case 31:
            return [0, 1, 7];
        	break;
        case 32:
            return [0, 2, 7];
        	break;
        case 33:
            return [0, 3, 7];
        	break;
        case 34:
            // RAMP 2
            return [1, 0, 2];
        	break;
        case 35:
            return [0, 0, 8];
        	break;
        case 36:
            return [0, 1, 8];
        	break;
        case 37:
            return [0, 2, 8];
        	break;
        case 38:
            return [0, 3, 8];
        	break;
        case 39:
            // RAMP 3
            return [1, 0, 3];
        	break;
        case 40:
            return [0, 0, 9];
        	break;
        case 41:
            return [0, 1, 9];
        	break;
        case 42:
            return [0, 2, 9];
        	break;
        case 43:
            return [0, 3, 9];
        	break;
        case 44:
            // RAMP 4
            return [1, 0, 4];
        	break;
        case 45:
            // RAMP 5
            return [1, 0, 5];
        	break;
        case 46:
            return [2, 0, 0];
        	break;
        case 47:
            return [2, 1, 0];
        	break;
        case 48:
            return [2, 2, 0];
        	break;
        case 49:
            return [2, 3, 0];
        	break;
        case 50:
            // RAMP 6
            return [1, 0, 6];
        	break;
        case 51:
            return [2, 0, 1];
        	break;
        case 52:
            return [2, 1, 1];
        	break;
        case 53:
            return [2, 2, 1];
        	break;
        case 54:
            return [2, 3, 1];
        	break;
        case 55:
            // RAMP 7
            return [1, 0, 7];
        	break;
        case 56:
            return [2, 0, 2];
        	break;
        case 57:
            return [2, 1, 2];
        	break;
        case 58:
            return [2, 2, 2];
        	break;
        case 59:
            return [2, 3, 2];
        	break;
    }
}

// converts a coordinate set (x, y, z) to a square numbe
// x = 0 : lower floor, x = 1 : ramp, x = 2 : top floor
function getSquareFromCoord(a) {
    var x = a[0]; var y = a[1]; var z = a[2];
    if(x == 0 && y == 0 && z == 0) {
    	return 0;
    }
    if(x == 0 && y == 1 && z == 0) {
    	return 1;
    }
    if(x == 0 && y == 2 && z == 0) {
    	return 2;
    }
    if(x == 0 && y == 3 && z == 0) {
    	return 3;
    }
    if(x == 0 && y == 0 && z == 1) {
    	return 4;
    }
    if(x == 0 && y == 1 && z == 1) {
    	return 5;
    }
    if(x == 0 && y == 2 && z == 1) {
    	return 6;
    }
    if(x == 0 && y == 3 && z == 1) {
    	return 7;
    }
    if(x == 0 && y == 0 && z == 2) {
    	return 8;
    }
    if(x == 0 && y == 1 && z == 2) {
    	return 9;
    }
    if(x == 0 && y == 2 && z == 2) {
    	return 10;
    }
    if(x == 0 && y == 3 && z == 2) {
    	return 11;
    }
    if(x == 0 && y == 0 && z == 3) {
    	return 12;
    }
    if(x == 0 && y == 1 && z == 3) {
    	return 13;
    }
    if(x == 0 && y == 2 && z == 3) {
    	return 14;
    }
    if(x == 0 && y == 3 && z == 3) {
    	return 15;
    }
    if(x == 0 && y == 0 && z == 4) {
    	return 16;
    }
    if(x == 0 && y == 1 && z == 4) {
    	return 17;
    }
    if(x == 0 && y == 2 && z == 4) {
    	return 18;
    }
    if(x == 0 && y == 3 && z == 4) {
    	return 19;
    }
    if(x == 0 && y == 0 && z == 5) {
    	return 20;
    }
    if(x == 0 && y == 1 && z == 5) {
    	return 21;
    }
    if(x == 0 && y == 2 && z == 5) {
    	return 22;
    }
    if(x == 0 && y == 3 && z == 5) {
    	return 23;
    }
    if(x == 1 && y == 0 && z == 0) {
    	return 24;
    }
    if(x == 0 && y == 0 && z == 6) {
    	return 25;
    }
    if(x == 0 && y == 1 && z == 6) {
    	return 26;
    }
    if(x == 0 && y == 2 && z == 6) {
    	return 27;
    }
    if(x == 0 && y == 3 && z == 6) {
    	return 28;
    }
    if(x == 1 && y == 0 && z == 1) {
    	return 29;
    }
    if(x == 0 && y == 0 && z == 7) {
    	return 30;
    }
    if(x == 0 && y == 1 && z == 7) {
    	return 31;
    }
    if(x == 0 && y == 2 && z == 7) {
    	return 32;
    }
    if(x == 0 && y == 3 && z == 7) {
    	return 33;
    }
    if(x == 1 && y == 0 && z == 2) {
    	return 34;
    }
    if(x == 0 && y == 0 && z == 8) {
    	return 35;
    }
    if(x == 0 && y == 1 && z == 8) {
    	return 36;
    }
    if(x == 0 && y == 2 && z == 8) {
    	return 37;
    }
    if(x == 0 && y == 3 && z == 8) {
    	return 38;
    }
    if(x == 1 && y == 0 && z == 3) {
    	return 39;
    }
    if(x == 0 && y == 0 && z == 9) {
    	return 40;
    }
    if(x == 0 && y == 1 && z == 9) {
    	return 41;
    }
    if(x == 0 && y == 2 && z == 9) {
    	return 42;
    }
    if(x == 0 && y == 3 && z == 9) {
    	return 43;
    }
    if(x == 1 && y == 0 && z == 4) {
    	return 44;
    }
    if(x == 1 && y == 0 && z == 5) {
    	return 45;
    }
    if(x == 2 && y == 0 && z == 0) {
    	return 46;
    }
    if(x == 2 && y == 1 && z == 0) {
    	return 47;
    }
    if(x == 2 && y == 2 && z == 0) {
    	return 48;
    }
    if(x == 2 && y == 3 && z == 0) {
    	return 49;
    }
    if(x == 1 && y == 0 && z == 6) {
    	return 50;
    }
    if(x == 2 && y == 0 && z == 1) {
    	return 51;
    }
    if(x == 2 && y == 1 && z == 1) {
    	return 52;
    }
    if(x == 2 && y == 2 && z == 1) {
    	return 53;
    }
    if(x == 2 && y == 3 && z == 1) {
    	return 54;
    }
    if(x == 1 && y == 0 && z == 7) {
    	return 55;
    }
    if(x == 2 && y == 0 && z == 2) {
    	return 56;
    }
    if(x == 2 && y == 1 && z == 2) {
    	return 57;
    }
    if(x == 2 && y == 2 && z == 2) {
    	return 58;
    }
    if(x == 2 && y == 3 && z == 2) {
    	return 59;
    }
    else {
        return -1;
    }
}

// returns border walls from '.border' i value
function getWallsFromBorder(n) {
    switch(n) {
        case 0:
            return [[[0, 0, 0], 1], [[0, 1, 0], 3]];
            break;
        case 1:
            return [[[0, 1, 0], 1], [[0, 2, 0], 3]];
            break;
        case 2:
            return [[[0, 2, 0], 1], [[0, 3, 0], 3]];
            break;
        case 3:
            return [[[0, 0, 0], 2], [[0, 0, 1], 0]];
            break;
        case 4:
            return [[[0, 1, 0], 2], [[0, 1, 1], 0]];
            break;
        case 5:
            return [[[0, 2, 0], 2], [[0, 2, 1], 0]];
            break;
        case 6:
            return [[[0, 3, 0], 2], [[0, 3, 1], 0]];
            break;
        case 7:
            return [[[0, 0, 1], 1], [[0, 1, 1], 3]];
            break;
        case 8:
            return [[[0, 1, 1], 1], [[0, 2, 1], 3]];
            break;
        case 9:
            return [[[0, 2, 1], 1], [[0, 3, 1], 3]];
            break;
        case 10:
            return [[[0, 0, 1], 2], [[0, 0, 2], 0]];
            break;
        case 11:
            return [[[0, 1, 1], 2], [[0, 1, 2], 0]];
            break;
        case 12:
            return [[[0, 2, 1], 2], [[0, 2, 2], 0]];
            break;
        case 13:
            return [[[0, 3, 1], 2], [[0, 3, 2], 0]];
            break;
        case 14:
            return [[[0, 0, 2], 1], [[0, 1, 2], 3]];
            break;
        case 15:
            return [[[0, 1, 2], 1], [[0, 2, 2], 3]];
            break;
        case 16:
            return [[[0, 2, 2], 1], [[0, 3, 2], 3]];
            break;
        case 17:
            return [[[0, 0, 2], 2], [[0, 0, 3], 0]];
            break;
        case 18:
            return [[[0, 1, 2], 2], [[0, 1, 3], 0]];
            break;
        case 19:
            return [[[0, 2, 2], 2], [[0, 2, 3], 0]];
            break;
        case 20:
            return [[[0, 3, 2], 2], [[0, 3, 3], 0]];
            break;
        case 21:
            return [[[0, 0, 3], 1], [[0, 1, 3], 3]];
            break;
        case 22:
            return [[[0, 1, 3], 1], [[0, 2, 3], 3]];
            break;
        case 23:
            return [[[0, 2, 3], 1], [[0, 3, 3], 3]];
            break;
        case 24:
            return [[[0, 0, 3], 2], [[0, 0, 4], 0]];
            break;
        case 25:
            return [[[0, 1, 3], 2], [[0, 1, 4], 0]];
            break;
        case 26:
            return [[[0, 2, 3], 2], [[0, 2, 4], 0]];
            break;
        case 27:
            return [[[0, 3, 3], 2], [[0, 3, 4], 0]];
            break;
        case 28:
            return [[[0, 0, 4], 1], [[0, 1, 4], 3]];
            break;
        case 29:
            return [[[0, 1, 4], 1], [[0, 2, 4], 3]];
            break;
        case 30:
            return [[[0, 2, 4], 1], [[0, 3, 4], 3]];
            break;
        case 31:
            return [[[0, 0, 4], 2], [[0, 0, 5], 0]];
            break;
        case 32:
            return [[[0, 1, 4], 2], [[0, 1, 5], 0]];
            break;
        case 33:
            return [[[0, 2, 4], 2], [[0, 2, 5], 0]];
            break;
        case 34:
            return [[[0, 3, 4], 2], [[0, 3, 5], 0]];
            break;
        case 35:
            return [[[0, 0, 5], 1], [[0, 1, 5], 3]];
            break;
        case 36:
            return [[[0, 1, 5], 1], [[0, 2, 5], 3]];
            break;
        case 37:
            return [[[0, 2, 5], 1], [[0, 3, 5], 3]];
            break;
        case 38:
            return [[[0, 0, 5], 2], [[0, 0, 6], 0]];
            break;
        case 39:
            return [[[0, 1, 5], 2], [[0, 1, 6], 0]];
            break;
        case 40:
            return [[[0, 2, 5], 2], [[0, 2, 6], 0]];
            break;
        case 41:
            return [[[0, 3, 5], 2], [[0, 3, 6], 0]];
            break;
        case 43:
            return [[[0, 0, 6], 1], [[0, 1, 6], 3]];
            break;
        case 44:
            return [[[0, 1, 6], 1], [[0, 2, 6], 3]];
            break;
        case 45:
            return [[[0, 2, 6], 1], [[0, 3, 6], 3]];
            break;
        case 46:
            return [[[0, 0, 6], 2], [[0, 0, 7], 0]];
            break;
        case 47:
            return [[[0, 1, 6], 2], [[0, 1, 7], 0]];
            break;
        case 48:
            return [[[0, 2, 6], 2], [[0, 2, 7], 0]];
            break;
        case 49:
            return [[[0, 3, 6], 2], [[0, 3, 7], 0]];
            break;
        case 50:
            return [[[0, 0, 7], 1], [[0, 1, 7], 3]];
            break;
        case 51:
            return [[[0, 1, 7], 1], [[0, 2, 7], 3]];
            break;
        case 52:
            return [[[0, 2, 7], 1], [[0, 3, 7], 3]];
            break;
        case 53:
            return [[[0, 0, 7], 2], [[0, 0, 8], 0]];
            break;
        case 54:
            return [[[0, 1, 7], 2], [[0, 1, 8], 0]];
            break;
        case 55:
            return [[[0, 2, 7], 2], [[0, 2, 8], 0]];
            break;
        case 56:
            return [[[0, 3, 7], 2], [[0, 3, 8], 0]];
            break;
        case 57:
            return [[[0, 0, 8], 1], [[0, 1, 8], 3]];
            break;
        case 58:
            return [[[0, 1, 8], 1], [[0, 2, 8], 3]];
            break;
        case 59:
            return [[[0, 2, 8], 1], [[0, 3, 8], 3]];
            break;
        case 60:
            return [[[0, 0, 8], 2], [[0, 0, 9], 0]];
            break;
        case 61:
            return [[[0, 1, 8], 2], [[0, 1, 9], 0]];
            break;
        case 62:
            return [[[0, 2, 8], 2], [[0, 2, 9], 0]];
            break;
        case 63:
            return [[[0, 3, 8], 2], [[0, 3, 9], 0]];
            break;
        case 64:
            return [[[0, 0, 9], 1], [[0, 1, 9], 3]];
            break;
        case 65:
            return [[[0, 1, 9], 1], [[0, 2, 9], 3]];
            break;
        case 66:
            return [[[0, 2, 9], 1], [[0, 3, 9], 3]];
            break;
        case 67:
            return [[[2, 0, 0], 1], [[2, 1, 0], 3]];
            break;
        case 68:
            return [[[2, 1, 0], 1], [[2, 2, 0], 3]];
            break;
        case 69:
            return [[[2, 2, 0], 1], [[2, 2, 0], 3]];
            break;
        case 70:
            return [[[2, 0, 0], 2], [[2, 0, 1], 0]];
            break;
        case 71:
            return [[[2, 1, 0], 2], [[2, 1, 1], 0]];
            break;
        case 72:
            return [[[2, 2, 0], 2], [[2, 2, 1], 0]];
            break;
        case 73:
            return [[[2, 3, 0], 2], [[2, 3, 1], 0]];
            break;
        case 74:
            return [[[2, 0, 1], 1], [[2, 1, 1], 3]];
            break;
        case 75:
            return [[[2, 1, 1], 1], [[2, 2, 1], 3]];
            break;
        case 76:
            return [[[2, 2, 1], 1], [[2, 2, 1], 3]];
            break;
        case 77:
            return [[[2, 0, 1], 2], [[2, 0, 2], 0]];
            break;
        case 78:
            return [[[2, 1, 1], 2], [[2, 1, 2], 0]];
            break;
        case 79:
            return [[[2, 2, 1], 2], [[2, 2, 2], 0]];
            break;
        case 80:
            return [[[2, 3, 1], 2], [[2, 3, 2], 0]];
            break;
        case 82:
            return [[[2, 0, 2], 1], [[2, 1, 2], 3]];
            break;
        case 83:
            return [[[2, 1, 2], 1], [[2, 2, 2], 3]];
            break;
        case 84:
            return [[[2, 2, 2], 1], [[2, 2, 2], 3]];
            break;
    }
}

// gets ('.border') number from coord and side
function getBorderFromWall(a, side) {
    var v = a[0].toString() + a[1].toString() + a[2].toString() + side.toString();
    switch(v) {
        case "0001": case "0103": return 0; break;
        case "0101": case "0203": return 1; break;
        case "0201": case "0303": return 2; break;
        case "0002": case "0010": return 3; break;
        case "0102": case "0110": return 4; break;
        case "0202": case "0210": return 5; break;
        case "0302": case "0310": return 6; break;
        case "0011": case "0113": return 7; break;
        case "0111": case "0213": return 8; break;
        case "0211": case "0313": return 9; break;
        case "0012": case "0020": return 10; break;
        case "0112": case "0120": return 11; break;
        case "0212": case "0220": return 12; break;
        case "0312": case "0320": return 13; break;
        case "0021": case "0123": return 14; break;
        case "0121": case "0223": return 15; break;
        case "0221": case "0323": return 16; break;
        case "0022": case "0030": return 17; break;
        case "0122": case "0130": return 18; break;
        case "0222": case "0230": return 19; break;
        case "0322": case "0330": return 20; break;
        case "0031": case "0133": return 21; break;
        case "0131": case "0233": return 22; break;
        case "0231": case "0333": return 23; break;
        case "0032": case "0040": return 24; break;
        case "0132": case "0140": return 25; break;
        case "0232": case "0240": return 26; break;
        case "0332": case "0340": return 27; break;
        case "0041": case "0143": return 28; break;
        case "0141": case "0243": return 29; break;
        case "0241": case "0343": return 30; break;
        case "0042": case "0050": return 31; break;
        case "0142": case "0150": return 32; break;
        case "0242": case "0250": return 33; break;
        case "0342": case "0350": return 34; break;
        case "0051": case "0153": return 35; break;
        case "0151": case "0253": return 36; break;
        case "0251": case "0353": return 37; break;
        case "0052": case "0060": return 38; break;
        case "0152": case "0160": return 39; break;
        case "0252": case "0260": return 40; break;
        case "0352": case "0360": return 41; break;
        case "0061": case "0163": return 43; break;
        case "0161": case "0263": return 44; break;
        case "0261": case "0363": return 45; break;
        case "0062": case "0070": return 46; break;
        case "0162": case "0170": return 47; break;
        case "0262": case "0270": return 48; break;
        case "0362": case "0370": return 49; break;
        case "0071": case "0173": return 50; break;
        case "0171": case "0273": return 51; break;
        case "0271": case "0373": return 52; break;
        case "0072": case "0080": return 53; break;
        case "0172": case "0180": return 54; break;
        case "0272": case "0280": return 55; break;
        case "0372": case "0380": return 56; break;
        case "0081": case "0183": return 57; break;
        case "0181": case "0283": return 58; break;
        case "0281": case "0383": return 59; break;
        case "0082": case "0090": return 60; break;
        case "0182": case "0190": return 61; break;
        case "0282": case "0290": return 62; break;
        case "0382": case "0390": return 63; break;
        case "0091": case "0193": return 64; break;
        case "0191": case "0293": return 65; break;
        case "0291": case "0393": return 66; break;
        case "2001": case "2103": return 67; break;
        case "2101": case "2203": return 68; break;
        case "2201": case "2203": return 69; break;
        case "2002": case "2010": return 70; break;
        case "2102": case "2110": return 71; break;
        case "2202": case "2210": return 72; break;
        case "2302": case "2310": return 73; break;
        case "2011": case "2113": return 74; break;
        case "2111": case "2213": return 75; break;
        case "2211": case "2213": return 76; break;
        case "2012": case "2020": return 77; break;
        case "2112": case "2120": return 78; break;
        case "2212": case "2220": return 79; break;
        case "2312": case "2320": return 80; break;
        case "2021": case "2123": return 82; break;
        case "2121": case "2223": return 83; break;
    }
    return -1;
}

// gets coordinate of a cell in a given direction from a given cell
// e.g. [0, 0, 0], 2 (south) -> [0, 1, 0]
function getCoordFromWall(a, d) {
    switch(d) {
        case 0:
            return (inBounds([a[0], a[1], a[2] - 1])) ? [a[0], a[1], a[2] - 1] : -1;
            break;
        case 1:
            return (inBounds([a[0], a[1] + 1, a[2]])) ? [a[0], a[1] + 1, a[2]] : -1;
            break;
        case 2:
            return (inBounds([a[0], a[1], a[2] + 1])) ? [a[0], a[1], a[2] + 1] : -1;
            break;
        case 3:
            return (inBounds([a[0], a[1] - 1, a[2]])) ? [a[0], a[1] - 1, a[2]] : -1;
    }
}

// checks whether a coordinate is in the maze bounds
function inBounds(a) {
    if(a[1] >= 0 && a[2] >= 0) {
        switch(a[0]) {
            case 0:
                return (a[1] <= 3 && a[2] <= 9);
                break;
            case 1:
                return (a[1] == 0 && a[2] <= 7);
                break;
            case 2:
                return (a[1] <= 3 && a[2] <= 2);
        }
    }
    return false;
}

// gets the direction (0 - north, 1 - east, 2 - south, 3 - west) of one cell from another
function getDirection(a, b) {
    if((a[1] == b[1]) && (a[2] == (b[2] - 1))) {
        return 2;
    }
    if((a[1] == b[1]) && (a[2] == (b[2] + 1))) {
        return 0;
    }
    if((a[1] == (b[1] - 1) && (a[2] == b[2]))) {
        return 1;
    }
    if((a[1] == (b[1] + 1) && (a[2] == b[2]))) {
        return 3;
    }
}

// returns walls array for a given coord
function getWalls(a) {
    return maze[a[0]][a[1]][a[2]].walls
}

// populates the struct with wall information
function populateWalls() {
    $('td.border').each(function(i) {
        if($(this).hasClass('wall')) {
            var result = getWallsFromBorder(i);
            for(var j = 0; j < result.length; j++) {
                var a = result[j][0];
                maze[a[0]][a[1]][a[2]].walls[result[j][1]][0] = 1;
            }
        }
    });
    
    // floor 0
    wallBorder(4, 10, 0);
    // floor 2
    wallBorder(4, 3, 2);
    
    // ramp entrance/exit
    maze[0][0][6].walls[3] = [0,0];
    maze[2][0][2].walls[3] = [0,0];
    maze[1][0][0].walls = [[0,0],[0,0],[0,0],[1,0]];
    maze[1][0][1].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][2].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][3].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][4].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][5].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][6].walls = [[0,0],[1,0],[0,0],[1,0]];
    maze[1][0][2].walls = [[0,0],[0,0],[1,0],[1,0]];
}

// populates the struct with man, black and start information
function populateSquare() {
    $("td.square").each(function(i){
        var a = getCoordFromSquare(i);
        if($(this).hasClass('victim') || $(this).children('.start').length == 1 || $(this).hasClass('black-tile')){            
            if($(this).hasClass('victim')) {
                var loc = $(this).children('img').attr('src');
                maze[a[0]][a[1]][a[2]].man = parseInt(loc.substr(loc.length - 5, 1));
            }
            if($(this).children('.start').length == 1)
                maze[a[0]][a[1]][a[2]].start = 1;
            if($(this).hasClass('black-tile'))
                maze[a[0]][a[1]][a[2]].black = 1;
        }
    });
}

// populates the struct with maze border walls
function wallBorder(x, y, floor) {
    x -= 1; y -= 1;
    for(var i = 0; i < x + 1; i++) {
        for(var j = 0; j < y + 1; j++) {
            if((i != j && i == 0 && j != y) || (i!=j&&j==0&&i!=x) || (i!=j&&i==x&&j!=y&&j!=0) || (i!=j&&j==y&&i!=x&&i!=0)) {
                if(i == 0) {
                    maze[floor][i][j].walls[3] = [1,0];
                }
                if(j == 0) {
                    maze[floor][i][j].walls[0] = [1,0];
                }
                if(i == 3) {
                    maze[floor][i][j].walls[1] = [1,0];
                }
                if(j == 9) {
                    maze[floor][i][j].walls[2] = [1,0];
                }
            }
                
        }
    }
    maze[floor][0][0].walls[0] = [1,0]; maze[floor][0][0].walls[3] = [1,0];
    maze[floor][x][0].walls[1] = [1,0]; maze[floor][x][0].walls[0] = [1,0];
    maze[floor][0][y].walls[2] = [1,0]; maze[floor][0][y].walls[3] = [1,0];
    maze[floor][x][y].walls[1] = [1,0]; maze[floor][x][y].walls[2] = [1,0];
}

// constructs maze struct
function setUpStruct() {
    maze = Array();
    maze[0] = Array(4);
    maze[0][0] = Array();
    maze[0][1] = Array();
    maze[0][2] = Array();
    maze[0][3] = Array();
    maze[1] = Array(1);
    maze[1][0] = Array(8);
    maze[2] = Array(4);
    maze[2][0] = Array();
    maze[2][1] = Array();
    maze[2][2] = Array();
    maze[2][3] = Array();
}

// sets default values for maze struct
function initialiseStruct() {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 10; j++) {
            maze[0][i][j] = {};
            maze[0][i][j].walls = [[0, -1], [0, -1], [0, -1], [0, -1]];
            maze[0][i][j].man = -1;
            maze[0][i][j].start = 0;
            maze[0][i][j].black = 0;
        }
    }
    
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
            maze[2][i][j] = {};
            maze[2][i][j].walls = [[0, -1], [0, -1], [0, -1], [0, -1]];
            maze[2][i][j].man = -1;     
            maze[2][i][j].start = 0;
            maze[2][i][j].black = 0;         
        }
    }
    
    for(var i = 0; i < 8; i++) {
        maze[1][0][i] = {};
        maze[1][0][i].walls = [[0, -1], [0, -1], [0, -1], [0, -1]];
        maze[1][0][i].man = -1;
        maze[1][0][i].start = 0;
        maze[1][0][i].black = 0;
    }
}

// initialises and populates the struct
function populateAll() {
    if(maze == undefined) setUpStruct();
    initialiseStruct();
    populateSquare();
    populateWalls();
}

// checks if coord set is on the border
function isBorder(a) {
    var x; var y;
    switch(a[0]) {
        case 0: x=3;y=9;return (((a[1]!=a[2]&&a[1]==0) || (a[1]!=a[2]&&a[2]==0) || (a[1]!=a[2]&&a[1]==x) || (a[1]!=a[2]&&a[2]==y) || (a[1]==a[2]&&a[1]==0)) || (a[1]==a[2]&&(a[1]==x||a[2]==y)) && !(a[1]==0&&a[2]==6));
        case 1: return true;
        case 2: x=3;y=2;return (((a[1]!=a[2]&&a[1]==0) || (a[1]!=a[2]&&a[2]==0) || (a[1]!=a[2]&&a[1]==x) || (a[1]!=a[2]&&a[2]==y) || (a[1]==a[2]&&a[1]==0)));// && !(a[1]==0&&a[2]==2));
    }
    return false;
}

function isSetSame(a, b) {
    return (a[0] == b[0] && a[1] == b[1] && a[2] == b[2]);
}

function isEdge(a, side) {
    var v = a[1]; var w = a[2];
    var x = 3; var y = 9;
    if(v == 0 && w == 0 && (side == 0 || side == 3)) {
        return true;
    }
    else if(v == 0 && w == y && (side == 2 || side == 3)) {
        return true;
    }
    else if(v == x && w == 0 && (side == 0 || side == 1)) {
        return true;
    }
    else if(v == x && w == y && (side == 1 || side == 2)) {
        return true;
    }
    else if(v == 0 && w > 0 && w < y && side == 3) {
        return true;
    }
    else if(v == x && w > 0 && w < y && side == 1) {
        return true;
    }
    else if(v > 0 && v < x && w == 0 && side == 0) {
        return true;
    }
    else if(v > 0 && v < x && w == y && side == 2) {
        return true;
    }
    return false;
}

// generates adjacent edges (hacky due to horrible HTML design - thanks Fredrik ;-) )
function getAdjacents(a, side, orig) {
    //console.log(orig);
    var adj = Array();
    var bodge = false;
    var tests = [
        [
            [0,1],
            [0,3],
            [1,0],
            [1,3],
            [3,0],
            [3,1],
            [0,0],
            [2,0]
        ],
        [   
            [0,1],
            [0,2],
            [1,0],
            [1,2],
            [2,1],
            [2,0],
            [3,1],
            [1,1]
        ],
        [
            [1,3],
            [1,2],
            [2,1],
            [2,3],
            [3,1],
            [3,2],
            [0,2],
            [2,2]
        ],
        [
            [0,3],
            [0,2],
            [2,0],
            [2,3],
            [3,2],
            [3,0],
            [3,3],
            [1,3]
        ]
    ];

    var n = [getCoordFromWall(a, 0), getCoordFromWall(a, 1), getCoordFromWall(a, 2), getCoordFromWall(a, 3)];
    for(var i = 0; i < 8; i++) {
        if(i == 6 || i == 7) {
            if(!isSetSame(a, orig[0])) {
                continue;
            }
        }
        var next_test = n[tests[side][i][0]];
        var next_wall = tests[side][i][1];
        if(next_test == -1) {
            next_test = a;
            switch(next_wall) {
                case 3: next_wall = 1; break;
                case 1: next_wall = 3; break;
                case 2: next_wall = 0; break;
                case 0: next_wall = 2;
            }
            if(!inBounds(next_test)) {
                continue;
            }
            bodge = true;
        }
        if(next_test == -1)
            continue;
        var walls = getWalls(next_test);
        var wall = walls[next_wall][0];
        if(wall == 1 || (bodge && isEdge(next_test, next_wall))) {
            var explored = isExplored(next_test, next_wall);
            if(!explored) {
                adj.push([next_test, next_wall]);
            }
        }
        bodge = false;
    }
    return adj;
}

// checks the explored set for a given node
function isExplored(x, side) {
    for(var i = 0; i < explored.length; i++) {
        if(explored[i][0][0] == x[0] && explored[i][0][1] == x[1] && explored[i][0][2] == x[2] && explored[i][1] == side) {
            return true;
        }
    }
    return false;
}

// checks to see whether a given wall side is floating (for victim)
function isFloating(a, side) {
    if(isBorder(a)) {
        //console.log('why not here?');
        return false;
    }
    else {
        clear();
        return isFloatingR(a, side, [a,side]);
    }
}

// global for the recursive floating checker
var val = true;

// depth-first search for finding a border edge
function isFloatingR(a, side, orig) {
    explored.push([a, side]);

    if(isEdge(a, side)) {
        return false;
    }
    var adj = getAdjacents(a, side, orig);
    console.log(adj)
    for(var i = 0; i < adj.length; i++) {
        val = isFloatingR(adj[i][0], adj[i][1], orig);
    }
    return val;
}

// returns the man status for a given coord
function getMan(a) {
    return maze[a[0]][a[1]][a[2]].man;
}

// clears the data stores for the floating checker
function clear() {
    val = true;
    explored = Array();
}

// evaluates each wall for float status
function evaluateWalls() {
    // floor 0
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 10; j++) {
            for(var k = 0; k < 4; k++) {
                evaluateWall([0,i,j], k);
            }
        }
    }
    // floor 2
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
            for(var k = 0; k < 4; k++) {    
                evaluateWall([2,i,j], k);
            }
        }
    }
}

// evaluates a single wall for float status
function evaluateWall(a, side) {
    maze[a[0]][a[1]][a[2]].walls[side][1] = (isFloating(a, side)) ? 1 : 0;
}

/*var borders = Array();

function borderArray() {
    $('td.border').each(function() {
        borders.push($(this));
    });
}*/

// adds each ('square') to an array for lookup later
function squareArray() {
    $('td.square').each(function(i) {
        squares.push($(this));
    });
}

// sets the type of each man (floating or linear)
function setMenTypes() {
    // floor 0
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 10; j++) {
            if(getMan([0,i,j]) != -1) {
                if(maze[0][i][j].walls[getMan([0,i,j])][1] == 1) {
                    // floating
                    //console.log('float');
                    squares[getSquareFromCoord([0,i,j])].children().first().attr('src', IMG_DIR + 'img/rescueB/victimf' + getMan([0,i,j]) + '.png');
                }
                else {
                    // linear
                    //console.log('linear');
                    squares[getSquareFromCoord([0,i,j])].children().first().attr('src', IMG_DIR + 'img/rescueB/victiml' + getMan([0,i,j]) + '.png');
                }
            }
        }
    }
    // floor 2
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
            for(var k = 0; k < 4; k++) {
                if(getMan([2,i,j]) != -1) {
                    if(maze[2][i][j].walls[k][1] == 1) {
                        // floating
                        squares[getSquareFromCoord([2,i,j])].children().first().attr('src', IMG_DIR + 'img/rescueB/victimf' + getMan([2,i,j]) + '.png');
                    }
                    else {
                        // linear
                        squares[getSquareFromCoord([2,i,j])].children().first().attr('src', IMG_DIR + 'img/rescueB/victiml' + getMan([2,i,j]) + '.png');
                    }
                }
            }
        }
    }
    // floor 1
    for(var i = 0; i < 8; i++) {
        if(getMan([1,0,i]) != -1) {
            squares[getSquareFromCoord([1,0,i])].children().first().attr('src', IMG_DIR + 'img/rescueB/victiml' + getMan([1,0,i]) + '.png');
        }
    }
}

function doMen() {
    /*populateAll();
    evaluateWalls();
    squareArray();
    setMenTypes();*/
}