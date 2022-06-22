const a = 
`
 ##
#  #
####
#  #
#  #
`

const b =
`
###
#  #
###
#  #
###
`

const c =
`
 ##
#
#
#
 ##
`

const d =
`
###
#  #
#  #
#  #
###
`

const e =
`
###
#
###
#
###
`

const f =
`
###
#
###
#
#
`

const g =
`
 ##
#
# #
#  #
 ##
`

const h =
`
#  #
#  #
####
#  #
#  #
`

const i =
`
###
 #
 #
 #
###
`

const j =
`
####
  #
  #
# #
 #
`

const k =
`
#  #
# #
##
# #
#  #
`

const l =
`
#
#
#
#
###
`

const m =
`
#   #
## ##
# # #
#   #
#   #
`

const n =
`
#  #
## #
# ##
#  #
#  #
`

const o =
`
 ##
#  #
#  #
#  #
 ##
`

const p =
`
##
# #
##
#
#
`

const q =
`
###
# #
# #
# #
##
  #`

const r =
`
##
# #
##
# #
# #
`

const s =
`
 ###
#
 ##
   #
###
`

const t =
`
###
 #
 #
 #
 #
`

const u =
`
#  #
#  #
#  #
#  #
 ##
`

const v =
`
# #
# #
# #
# #
 #
`

const w =
`
#   #
#   #
# # #
# # #
 # #
`

const x =
`
# #
# #
 #
# #
# #
`

const y =
`
#  #
#  #
 ###
   #
###
`

const z = 
`
####
   #
  #
 #
####
`

const exclaimation = 
`
#
#
#

#
`

const at = 
`
 ###
# # #
#####
# #
#
 ###`

const hashtag = 
`
 # #
#####
 # #
#####
 # #
`

const dollar = 
`  #
 ####
# #
 ###
  # #
####
  #
`

const percent = 
`
# #
  #
 #
#
# #
`

const caret = 
`
 #
# #



`

const ampersand =
`
 #
# #
 #
# #
## #
`

const asterisk = 
`
 #
###
 #


`

const slash = 
`
  #
  #
 #
#
#
`

const plus = 
`

 #
###
 #

`

const minus =
`


###


`

const equals = 
`

###

###

`

const underscore = 
`





####`

const space = 
`

 



`

const period = 
`

 


#
`

const colon = 
`

#

#

`

const semicolon = 
`

 #

 #
#
`

const openparen = 
`
#
 #
 #
 #
#
`

const closeparen = 
`
 #
#
#
#
 #
`

const lessthan = 
`
  #
 #
#
 #
  #
`

const greaterthan = 
`
#
 #
  #
 #
#
`

const one = `
 ##
# #
  #
  #
 ###
`

const two = `
 ##
#  #
  #
 #
####
`

const three = `
 ##
#  #
  #
#  #
 ##
`

const four = `
#  #
#  #
####
   #
   #
`

const five = `
####
#  
###  
   #
###
`

const six = `
 #
#
### 
#  #
 ##
`

const seven = `
####
   #
  #
 #
#
`

const eight = `
 ##
#  #
 ##
#  #
 ##
`

const nine = `
 ##
#  #
 ##
#  #
 ##
`

const zero = `
 ###
#  ##
# # #
##  #
 ###
`

const letters = {
    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
    '!': exclaimation,
    '@': at,
    '#': hashtag,
    '$': dollar,
    '%': percent,
    '^': caret,
    '&': ampersand,
    '*': asterisk,
    '/': slash,
    '+': plus,
    '-': minus,
    '=': equals,
    '_': underscore,
    ' ': space,
    '.': period,
    ':': colon,
    ';': semicolon,
    '(': openparen,
    ')': closeparen,
    '<': lessthan,
    '>': greaterthan,
    '1': one,
    '2': two,
    '3': three,
    '4': four,
    '5': five,
    '6': six,
    '7': seven,
    '8': eight,
    '9': nine,
    '0': zero
};

function daysLater (initial, days) {
    const timePassed = days * 24 * 60 * 60 * 1000;
    return new Date(new Date(initial).setDate(initial.getDate() + days));
}

function MMDDYYYY (date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function MMDDYYdash (date) {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

function type (year, message) {
    const sunday = new Date(year + '-1-' + (1 + 7 - new Date(year + '-1-1 0:00').getDay()) + ' 0:00');
    const dates = [];
    const messageLetters = message.toLowerCase().split('');
    let weeks = 0;
    for (const letter of messageLetters) {
        const output = makeLetter(letter, sunday, weeks);
        weeks = output.weeks;
        dates.push(...output.dates);
    }
    const commands = [];
    
    dates.forEach(date => {
        commands.push(`mkdir ContribGraphMessages || true`);
        commands.push(`echo "${Date.now()}" > ContribGraphMessages/${MMDDYYdash(date)}.txt`);
        commands.push(`echo "${MMDDYYdash(date) + '_' + Date.now()}" > ./logs.txt`);
        commands.push(`sleep 0`);
        commands.push('git add -A');
        commands.push(`git commit -m "${date.toISOString()}" --date "${MMDDYYYY(date)}" --quiet`);
    });
        
    return commands;
}

function makeLetter (letter, sunday, weeks) {
    if (!letters[letter]) return { dates: [], weeks };
    weeks++;

    let maxLength = 0;
    letters[letter].split('\n').forEach(line => line.length > maxLength ? maxLength = line.length : 0);

    const dates = [];

    const lines = letters[letter].split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const chars = line.split('');

        for (let j = 0; j < chars.length; j++) {
            const char = chars[j];
            if (char === ' ') continue;

            const date = daysLater(sunday, weeks * 7 + j * 7 + i);
            
            dates.push(date);
        }
    }

    weeks += maxLength;

    return {
        dates,
        weeks
    }
}

module.exports = type;
