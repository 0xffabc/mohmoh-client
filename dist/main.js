// ==UserScript==
// @name            New script mohmoh.eu
// @namespace   Violentmonkey Scripts
// @match           *://www.mohmoh.eu/*
// @grant             none
// @version          1.0
// @author            -
// @description    27.05.2024, 08:40:33
// @require          https://update.greasyfork.org/scripts/423602/1005014/msgpack.js
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/bad-words/lib/badwords.js":
/*!************************************************!*\
  !*** ./node_modules/bad-words/lib/badwords.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const localList = (__webpack_require__(/*! ./lang.json */ "./node_modules/bad-words/lib/lang.json").words);
const baseList = (__webpack_require__(/*! badwords-list */ "./node_modules/badwords-list/lib/index.js").array);

class Filter {

  /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   * @param {string} options.splitRegex - Regular expression used to split a string into words.
   */
  constructor(options = {}) {
    Object.assign(this, {
      list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\b/,
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g
    })
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    return this.list
      .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    return string.split(this.splitRegex).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join(this.splitRegex.exec(string)[0]);
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }
}

module.exports = Filter;

/***/ }),

/***/ "./node_modules/badwords-list/lib/array.js":
/*!*************************************************!*\
  !*** ./node_modules/badwords-list/lib/array.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

/***/ }),

/***/ "./node_modules/badwords-list/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/badwords-list/lib/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  object: __webpack_require__(/*! ./object */ "./node_modules/badwords-list/lib/object.js"),
  array: __webpack_require__(/*! ./array */ "./node_modules/badwords-list/lib/array.js"),
  regex: __webpack_require__(/*! ./regexp */ "./node_modules/badwords-list/lib/regexp.js")
};

/***/ }),

/***/ "./node_modules/badwords-list/lib/object.js":
/*!**************************************************!*\
  !*** ./node_modules/badwords-list/lib/object.js ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"4r5e": 1, "5h1t": 1, "5hit": 1, "a55": 1, "anal": 1, "anus": 1, "ar5e": 1, "arrse": 1, "arse": 1, "ass": 1, "ass-fucker": 1, "asses": 1, "assfucker": 1, "assfukka": 1, "asshole": 1, "assholes": 1, "asswhole": 1, "a_s_s": 1, "b!tch": 1, "b00bs": 1, "b17ch": 1, "b1tch": 1, "ballbag": 1, "balls": 1, "ballsack": 1, "bastard": 1, "beastial": 1, "beastiality": 1, "bellend": 1, "bestial": 1, "bestiality": 1, "bi+ch": 1, "biatch": 1, "bitch": 1, "bitcher": 1, "bitchers": 1, "bitches": 1, "bitchin": 1, "bitching": 1, "bloody": 1, "blow job": 1, "blowjob": 1, "blowjobs": 1, "boiolas": 1, "bollock": 1, "bollok": 1, "boner": 1, "boob": 1, "boobs": 1, "booobs": 1, "boooobs": 1, "booooobs": 1, "booooooobs": 1, "breasts": 1, "buceta": 1, "bugger": 1, "bum": 1, "bunny fucker": 1, "butt": 1, "butthole": 1, "buttmuch": 1, "buttplug": 1, "c0ck": 1, "c0cksucker": 1, "carpet muncher": 1, "cawk": 1, "chink": 1, "cipa": 1, "cl1t": 1, "clit": 1, "clitoris": 1, "clits": 1, "cnut": 1, "cock": 1, "cock-sucker": 1, "cockface": 1, "cockhead": 1, "cockmunch": 1, "cockmuncher": 1, "cocks": 1, "cocksuck": 1, "cocksucked": 1, "cocksucker": 1, "cocksucking": 1, "cocksucks": 1, "cocksuka": 1, "cocksukka": 1, "cok": 1, "cokmuncher": 1, "coksucka": 1, "coon": 1, "cox": 1, "crap": 1, "cum": 1, "cummer": 1, "cumming": 1, "cums": 1, "cumshot": 1, "cunilingus": 1, "cunillingus": 1, "cunnilingus": 1, "cunt": 1, "cuntlick": 1, "cuntlicker": 1, "cuntlicking": 1, "cunts": 1, "cyalis": 1, "cyberfuc": 1, "cyberfuck": 1, "cyberfucked": 1, "cyberfucker": 1, "cyberfuckers": 1, "cyberfucking": 1, "d1ck": 1, "damn": 1, "dick": 1, "dickhead": 1, "dildo": 1, "dildos": 1, "dink": 1, "dinks": 1, "dirsa": 1, "dlck": 1, "dog-fucker": 1, "doggin": 1, "dogging": 1, "donkeyribber": 1, "doosh": 1, "duche": 1, "dyke": 1, "ejaculate": 1, "ejaculated": 1, "ejaculates": 1, "ejaculating": 1, "ejaculatings": 1, "ejaculation": 1, "ejakulate": 1, "f u c k": 1, "f u c k e r": 1, "f4nny": 1, "fag": 1, "fagging": 1, "faggitt": 1, "faggot": 1, "faggs": 1, "fagot": 1, "fagots": 1, "fags": 1, "fanny": 1, "fannyflaps": 1, "fannyfucker": 1, "fanyy": 1, "fatass": 1, "fcuk": 1, "fcuker": 1, "fcuking": 1, "feck": 1, "fecker": 1, "felching": 1, "fellate": 1, "fellatio": 1, "fingerfuck": 1, "fingerfucked": 1, "fingerfucker": 1, "fingerfuckers": 1, "fingerfucking": 1, "fingerfucks": 1, "fistfuck": 1, "fistfucked": 1, "fistfucker": 1, "fistfuckers": 1, "fistfucking": 1, "fistfuckings": 1, "fistfucks": 1, "flange": 1, "fook": 1, "fooker": 1, "fuck": 1, "fucka": 1, "fucked": 1, "fucker": 1, "fuckers": 1, "fuckhead": 1, "fuckheads": 1, "fuckin": 1, "fucking": 1, "fuckings": 1, "fuckingshitmotherfucker": 1, "fuckme": 1, "fucks": 1, "fuckwhit": 1, "fuckwit": 1, "fudge packer": 1, "fudgepacker": 1, "fuk": 1, "fuker": 1, "fukker": 1, "fukkin": 1, "fuks": 1, "fukwhit": 1, "fukwit": 1, "fux": 1, "fux0r": 1, "f_u_c_k": 1, "gangbang": 1, "gangbanged": 1, "gangbangs": 1, "gaylord": 1, "gaysex": 1, "goatse": 1, "God": 1, "god-dam": 1, "god-damned": 1, "goddamn": 1, "goddamned": 1, "hardcoresex": 1, "hell": 1, "heshe": 1, "hoar": 1, "hoare": 1, "hoer": 1, "homo": 1, "hore": 1, "horniest": 1, "horny": 1, "hotsex": 1, "jack-off": 1, "jackoff": 1, "jap": 1, "jerk-off": 1, "jism": 1, "jiz": 1, "jizm": 1, "jizz": 1, "kawk": 1, "knob": 1, "knobead": 1, "knobed": 1, "knobend": 1, "knobhead": 1, "knobjocky": 1, "knobjokey": 1, "kock": 1, "kondum": 1, "kondums": 1, "kum": 1, "kummer": 1, "kumming": 1, "kums": 1, "kunilingus": 1, "l3i+ch": 1, "l3itch": 1, "labia": 1, "lust": 1, "lusting": 1, "m0f0": 1, "m0fo": 1, "m45terbate": 1, "ma5terb8": 1, "ma5terbate": 1, "masochist": 1, "master-bate": 1, "masterb8": 1, "masterbat*": 1, "masterbat3": 1, "masterbate": 1, "masterbation": 1, "masterbations": 1, "masturbate": 1, "mo-fo": 1, "mof0": 1, "mofo": 1, "mothafuck": 1, "mothafucka": 1, "mothafuckas": 1, "mothafuckaz": 1, "mothafucked": 1, "mothafucker": 1, "mothafuckers": 1, "mothafuckin": 1, "mothafucking": 1, "mothafuckings": 1, "mothafucks": 1, "mother fucker": 1, "motherfuck": 1, "motherfucked": 1, "motherfucker": 1, "motherfuckers": 1, "motherfuckin": 1, "motherfucking": 1, "motherfuckings": 1, "motherfuckka": 1, "motherfucks": 1, "muff": 1, "mutha": 1, "muthafecker": 1, "muthafuckker": 1, "muther": 1, "mutherfucker": 1, "n1gga": 1, "n1gger": 1, "nazi": 1, "nigg3r": 1, "nigg4h": 1, "nigga": 1, "niggah": 1, "niggas": 1, "niggaz": 1, "nigger": 1, "niggers": 1, "nob": 1, "nob jokey": 1, "nobhead": 1, "nobjocky": 1, "nobjokey": 1, "numbnuts": 1, "nutsack": 1, "orgasim": 1, "orgasims": 1, "orgasm": 1, "orgasms": 1, "p0rn": 1, "pawn": 1, "pecker": 1, "penis": 1, "penisfucker": 1, "phonesex": 1, "phuck": 1, "phuk": 1, "phuked": 1, "phuking": 1, "phukked": 1, "phukking": 1, "phuks": 1, "phuq": 1, "pigfucker": 1, "pimpis": 1, "piss": 1, "pissed": 1, "pisser": 1, "pissers": 1, "pisses": 1, "pissflaps": 1, "pissin": 1, "pissing": 1, "pissoff": 1, "poop": 1, "porn": 1, "porno": 1, "pornography": 1, "pornos": 1, "prick": 1, "pricks": 1, "pron": 1, "pube": 1, "pusse": 1, "pussi": 1, "pussies": 1, "pussy": 1, "pussys": 1, "rectum": 1, "retard": 1, "rimjaw": 1, "rimming": 1, "s hit": 1, "s.o.b.": 1, "sadist": 1, "schlong": 1, "screwing": 1, "scroat": 1, "scrote": 1, "scrotum": 1, "semen": 1, "sex": 1, "sh!+": 1, "sh!t": 1, "sh1t": 1, "shag": 1, "shagger": 1, "shaggin": 1, "shagging": 1, "shemale": 1, "shi+": 1, "shit": 1, "shitdick": 1, "shite": 1, "shited": 1, "shitey": 1, "shitfuck": 1, "shitfull": 1, "shithead": 1, "shiting": 1, "shitings": 1, "shits": 1, "shitted": 1, "shitter": 1, "shitters": 1, "shitting": 1, "shittings": 1, "shitty": 1, "skank": 1, "slut": 1, "sluts": 1, "smegma": 1, "smut": 1, "snatch": 1, "son-of-a-bitch": 1, "spac": 1, "spunk": 1, "s_h_i_t": 1, "t1tt1e5": 1, "t1tties": 1, "teets": 1, "teez": 1, "testical": 1, "testicle": 1, "tit": 1, "titfuck": 1, "tits": 1, "titt": 1, "tittie5": 1, "tittiefucker": 1, "titties": 1, "tittyfuck": 1, "tittywank": 1, "titwank": 1, "tosser": 1, "turd": 1, "tw4t": 1, "twat": 1, "twathead": 1, "twatty": 1, "twunt": 1, "twunter": 1, "v14gra": 1, "v1gra": 1, "vagina": 1, "viagra": 1, "vulva": 1, "w00se": 1, "wang": 1, "wank": 1, "wanker": 1, "wanky": 1, "whoar": 1, "whore": 1, "willies": 1, "willy": 1, "xrated": 1, "xxx": 1};

/***/ }),

/***/ "./node_modules/badwords-list/lib/regexp.js":
/*!**************************************************!*\
  !*** ./node_modules/badwords-list/lib/regexp.js ***!
  \**************************************************/
/***/ ((module) => {

module.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var setFunctionLength = __webpack_require__(/*! set-function-length */ "./node_modules/set-function-length/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/define-data-property/index.js":
/*!****************************************************!*\
  !*** ./node_modules/define-data-property/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var gopd = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ "./node_modules/es-define-property/index.js":
/*!**************************************************!*\
  !*** ./node_modules/es-define-property/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),

/***/ "./node_modules/es-errors/eval.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/eval.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ "./node_modules/es-errors/index.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ "./node_modules/es-errors/range.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/range.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),

/***/ "./node_modules/es-errors/ref.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/ref.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),

/***/ "./node_modules/es-errors/syntax.js":
/*!******************************************!*\
  !*** ./node_modules/es-errors/syntax.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ "./node_modules/es-errors/type.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/type.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ "./node_modules/es-errors/uri.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/uri.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Error = __webpack_require__(/*! es-errors */ "./node_modules/es-errors/index.js");
var $EvalError = __webpack_require__(/*! es-errors/eval */ "./node_modules/es-errors/eval.js");
var $RangeError = __webpack_require__(/*! es-errors/range */ "./node_modules/es-errors/range.js");
var $ReferenceError = __webpack_require__(/*! es-errors/ref */ "./node_modules/es-errors/ref.js");
var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $URIError = __webpack_require__(/*! es-errors/uri */ "./node_modules/es-errors/uri.js");

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();
var hasProto = __webpack_require__(/*! has-proto */ "./node_modules/has-proto/index.js")();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/has-proto/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/hasown/index.js":
/*!**************************************!*\
  !*** ./node_modules/hasown/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = (__webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8),
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/md5/node_modules/is-buffer/index.js"),
      bin = (__webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin),

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "./node_modules/md5/node_modules/is-buffer/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/md5/node_modules/is-buffer/index.js ***!
  \**********************************************************/
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/object-inspect/index.js":
/*!**********************************************!*\
  !*** ./node_modules/object-inspect/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace.call(str, sepRegex, '$&_');
}

var utilInspect = __webpack_require__(/*! ./util.inspect */ "?4f7e");
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
            mapForEach.call(obj, function (value, key) {
                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
            });
        }
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
            setForEach.call(obj, function (value) {
                setParts.push(inspect(value, obj));
            });
        }
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    // note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
    /* eslint-env browser */
    if (typeof window !== 'undefined' && obj === window) {
        return '{ [object Window] }';
    }
    if (obj === __webpack_require__.g) {
        return '{ [object globalThis] }';
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowEmptyArrays: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decodeDotInKeys: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    duplicates: 'combine',
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = { __proto__: null };

    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        var existing = has.call(obj, key);
        if (existing && options.duplicates === 'combine') {
            obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === 'last') {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = options.allowEmptyArrays && leaf === '' ? [] : [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, '.') : cleanRoot;
            var index = parseInt(decodedRoot, 10);
            if (!options.parseArrays && decodedRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== decodedRoot
                && String(index) === decodedRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (decodedRoot !== '__proto__') {
                obj[decodedRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    }

    if (typeof opts.decodeDotInKeys !== 'undefined' && typeof opts.decodeDotInKeys !== 'boolean') {
        throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided');
    }

    if (opts.decoder !== null && typeof opts.decoder !== 'undefined' && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    var duplicates = typeof opts.duplicates === 'undefined' ? defaults.duplicates : opts.duplicates;

    if (duplicates !== 'combine' && duplicates !== 'first' && duplicates !== 'last') {
        throw new TypeError('The duplicates option must be either combine, first, or last');
    }

    var allowDots = typeof opts.allowDots === 'undefined' ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

    return {
        allowDots: allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === 'boolean' ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        duplicates: duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getSideChannel = __webpack_require__(/*! side-channel */ "./node_modules/side-channel/index.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    allowEmptyArrays: false,
    arrayFormat: 'indices',
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encodeDotInKeys: false,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    allowEmptyArrays,
    strictNullHandling,
    skipNulls,
    encodeDotInKeys,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    var tmpSc = sideChannel;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        if (encodeValuesOnly && encoder) {
            obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    var encodedPrefix = encodeDotInKeys ? prefix.replace(/\./g, '%2E') : prefix;

    var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + '[]' : encodedPrefix;

    if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + '[]';
    }

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var encodedKey = allowDots && encodeDotInKeys ? key.replace(/\./g, '%2E') : key;
        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix
            : adjustedPrefix + (allowDots ? '.' + encodedKey : '[' + encodedKey + ']');

        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            allowEmptyArrays,
            strictNullHandling,
            skipNulls,
            encodeDotInKeys,
            generateArrayPrefix === 'comma' && encodeValuesOnly && isArray(obj) ? null : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    }

    if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean') {
        throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    var arrayFormat;
    if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if ('indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = defaults.arrayFormat;
    }

    if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }

    var allowDots = typeof opts.allowDots === 'undefined' ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat: arrayFormat,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === 'boolean' ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
    var commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.allowEmptyArrays,
            options.strictNullHandling,
            options.skipNulls,
            options.encodeDotInKeys,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var limit = 1024;

/* eslint operator-linebreak: [2, "before"] */

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];

        for (var i = 0; i < segment.length; ++i) {
            var c = segment.charCodeAt(i);
            if (
                c === 0x2D // -
                || c === 0x2E // .
                || c === 0x5F // _
                || c === 0x7E // ~
                || (c >= 0x30 && c <= 0x39) // 0-9
                || (c >= 0x41 && c <= 0x5A) // a-z
                || (c >= 0x61 && c <= 0x7A) // A-Z
                || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
            ) {
                arr[arr.length] = segment.charAt(i);
                continue;
            }

            if (c < 0x80) {
                arr[arr.length] = hexTable[c];
                continue;
            }

            if (c < 0x800) {
                arr[arr.length] = hexTable[0xC0 | (c >> 6)]
                    + hexTable[0x80 | (c & 0x3F)];
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                arr[arr.length] = hexTable[0xE0 | (c >> 12)]
                    + hexTable[0x80 | ((c >> 6) & 0x3F)]
                    + hexTable[0x80 | (c & 0x3F)];
                continue;
            }

            i += 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | (segment.charCodeAt(i) & 0x3FF));

            arr[arr.length] = hexTable[0xF0 | (c >> 18)]
                + hexTable[0x80 | ((c >> 12) & 0x3F)]
                + hexTable[0x80 | ((c >> 6) & 0x3F)]
                + hexTable[0x80 | (c & 0x3F)];
        }

        out += arr.join('');
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "./node_modules/set-function-length/index.js":
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ "./node_modules/side-channel/index.js":
/*!********************************************!*\
  !*** ./node_modules/side-channel/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var inspect = __webpack_require__(/*! object-inspect */ "./node_modules/object-inspect/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
* This function traverses the list returning the node corresponding to the given key.
*
* That node is also moved to the head of the list, so that if it's accessed again we don't need to traverse the whole list. By doing so, all the recently used nodes can be accessed relatively quickly.
*/
/** @type {import('.').listGetNode} */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	/** @type {typeof list | NonNullable<(typeof list)['next']>} */
	var prev = list;
	/** @type {(typeof list)['next']} */
	var curr;
	for (; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			// eslint-disable-next-line no-extra-parens
			curr.next = /** @type {NonNullable<typeof list.next>} */ (list.next);
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

/** @type {import('.').listGet} */
var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
/** @type {import('.').listSet} */
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = /** @type {import('.').ListNode<typeof value>} */ ({ // eslint-disable-line no-param-reassign, no-extra-parens
			key: key,
			next: objects.next,
			value: value
		});
	}
};
/** @type {import('.').listHas} */
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

/** @type {import('.')} */
module.exports = function getSideChannel() {
	/** @type {WeakMap<object, unknown>} */ var $wm;
	/** @type {Map<object, unknown>} */ var $m;
	/** @type {import('.').RootNode<unknown>} */ var $o;

	/** @type {import('.').Channel} */
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					// Initialize the linked list as an empty node, so that we don't have to special-case handling of the first node: we can always refer to it as (previous node).next, instead of something like (list).head
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "./node_modules/url/node_modules/punycode/punycode.js":
/*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



var punycode = __webpack_require__(/*! punycode */ "./node_modules/url/node_modules/punycode/punycode.js");

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

/*
 * define these here so at least they only have to be
 * compiled once on the first module load.
 */
var protocolPattern = /^([a-z0-9.+-]+:)/i,
  portPattern = /:[0-9]*$/,

  // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,

  /*
   * RFC 2396: characters reserved for delimiting URLs.
   * We actually just auto-escape these.
   */
  delims = [
    '<', '>', '"', '`', ' ', '\r', '\n', '\t'
  ],

  // RFC 2396: characters not allowed for various reasons.
  unwise = [
    '{', '}', '|', '\\', '^', '`'
  ].concat(delims),

  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),
  /*
   * Characters that are never ever allowed in a hostname.
   * Note that any invalid chars are also handled, but these
   * are the ones that are *expected* to be seen, so we fast-path
   * them.
   */
  nonHostChars = [
    '%', '/', '?', ';', '#'
  ].concat(autoEscape),
  hostEndingChars = [
    '/', '?', '#'
  ],
  hostnameMaxLen = 255,
  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    javascript: true,
    'javascript:': true
  },
  // protocols that never have a hostname.
  hostlessProtocol = {
    javascript: true,
    'javascript:': true
  },
  // protocols that always contain a // bit.
  slashedProtocol = {
    http: true,
    https: true,
    ftp: true,
    gopher: true,
    file: true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  },
  querystring = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof url === 'object' && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  /*
   * Copy chrome, IE, opera backslash-handling behavior.
   * Back slashes before the query string get converted to forward slashes
   * See: https://code.google.com/p/chromium/issues/detail?id=25916
   */
  var queryIndex = url.indexOf('?'),
    splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
    uSplit = url.split(splitter),
    slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  /*
   * trim before proceeding.
   * This is to support parse stuff like "  http://foo.com  \n"
   */
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  /*
   * figure out if it's got a host
   * user@server is *always* interpreted as a hostname, and url
   * resolution will treat //foo/bar as host=foo,path=bar because that's
   * how the browser resolves relative URLs.
   */
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {

    /*
     * there's a hostname.
     * the first instance of /, ?, ;, or # ends the host.
     *
     * If there is an @ in the hostname, then non-host chars *are* allowed
     * to the left of the last @ sign, unless some host-ending character
     * comes *before* the @-sign.
     * URLs are obnoxious.
     *
     * ex:
     * http://a@b@c/ => user:a@b host:c
     * http://a@b?@c => user:a host:c path:/?@c
     */

    /*
     * v0.12 TODO(isaacs): This is not quite how Chrome does things.
     * Review our test case against browsers more comprehensively.
     */

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    }

    /*
     * at this point, either we have an explicit point where the
     * auth portion cannot go past, or the last @ char is the decider.
     */
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      /*
       * atSign must be in auth portion.
       * http://a@b/c@d => host:b auth:a path:/c@d
       */
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    /*
     * Now we have a portion which is definitely the auth.
     * Pull that off.
     */
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) { hostEnd = rest.length; }

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    /*
     * we've indicated that there is a hostname,
     * so even if it's empty, it has to be present.
     */
    this.hostname = this.hostname || '';

    /*
     * if hostname begins with [ and ends with ]
     * assume that it's an IPv6 address.
     */
    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              /*
               * we replace non-ASCII char with a temporary placeholder
               * we need this to make sure size of hostname is not
               * broken by replacing non-ASCII by nothing
               */
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      /*
       * IDNA Support: Returns a punycoded representation of "domain".
       * It only converts parts of the domain name that
       * have non-ASCII characters, i.e. it doesn't matter if
       * you call it with a domain that already is ASCII-only.
       */
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    /*
     * strip [ and ] from the hostname
     * the host field still retains them, though
     */
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  /*
   * now rest is set to the post-host stuff.
   * chop off any delim chars.
   */
  if (!unsafeProtocol[lowerProto]) {

    /*
     * First, make 100% sure that any "autoEscape" chars get
     * escaped, even if encodeURIComponent doesn't think they
     * need to be.
     */
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) { continue; }
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  // to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  /*
   * ensure it's an object, and not a string url.
   * If it's an obj, this is a no-op.
   * this way, you can call url_format() on strings
   * to clean up potentially wonky urls.
   */
  if (typeof obj === 'string') { obj = urlParse(obj); }
  if (!(obj instanceof Url)) { return Url.prototype.format.call(obj); }
  return obj.format();
}

Url.prototype.format = function () {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
    pathname = this.pathname || '',
    hash = this.hash || '',
    host = false,
    query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && typeof this.query === 'object' && Object.keys(this.query).length) {
    query = querystring.stringify(this.query, {
      arrayFormat: 'repeat',
      addQueryPrefix: false
    });
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; }

  /*
   * only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
   * unless they had them to begin with.
   */
  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
  if (search && search.charAt(0) !== '?') { search = '?' + search; }

  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) { return relative; }
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function (relative) {
  if (typeof relative === 'string') {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  /*
   * hash is always overridden, no matter what.
   * even href="" will remove it.
   */
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') { result[rkey] = relative[rkey]; }
    }

    // urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.pathname = '/';
      result.path = result.pathname;
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    /*
     * if it's a known url protocol, then changing
     * the protocol does weird things
     * first, if it's not file:, then we MUST have a host,
     * and if there was a path
     * to begin with, then we MUST have a path.
     * if it is file:, then the host is dropped,
     * because that's known to be hostless.
     * anything else is assumed to be absolute.
     */
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift())) { }
      if (!relative.host) { relative.host = ''; }
      if (!relative.hostname) { relative.hostname = ''; }
      if (relPath[0] !== '') { relPath.unshift(''); }
      if (relPath.length < 2) { relPath.unshift(''); }
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
    isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
    mustEndAbs = isRelAbs || isSourceAbs || (result.host && relative.pathname),
    removeAllDots = mustEndAbs,
    srcPath = result.pathname && result.pathname.split('/') || [],
    relPath = relative.pathname && relative.pathname.split('/') || [],
    psychotic = result.protocol && !slashedProtocol[result.protocol];

  /*
   * if the url is a non-slashed url, then relative
   * links like ../.. should be able
   * to crawl up to the hostname, as well.  This is strange.
   * result.protocol has already been set by now.
   * Later on, put the first path part into the host field.
   */
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') { srcPath[0] = result.host; } else { srcPath.unshift(result.host); }
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') { relPath[0] = relative.host; } else { relPath.unshift(relative.host); }
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    /*
     * it's relative
     * throw away the existing file, and take the new path instead.
     */
    if (!srcPath) { srcPath = []; }
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (relative.search != null) {
    /*
     * just pull out the search.
     * like href='?foo'.
     * Put this after the other two cases because it simplifies the booleans
     */
    if (psychotic) {
      result.host = srcPath.shift();
      result.hostname = result.host;
      /*
       * occationaly the auth can get stuck only in host
       * this especially happens in cases like
       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
       */
      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.hostname = authInHost.shift();
        result.host = result.hostname;
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    // to support http.request
    if (result.pathname !== null || result.search !== null) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    /*
     * no path at all.  easy.
     * we've already handled the other stuff above.
     */
    result.pathname = null;
    // to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  /*
   * if a url ENDs in . or .., then it must get a trailing slash.
   * however, if it ends in anything else non-slashy,
   * then it must NOT get a trailing slash.
   */
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

  /*
   * strip single dots, resolve double dots to parent dir
   * if the path tries to go above the root, `up` ends up > 0
   */
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
    result.host = result.hostname;
    /*
     * occationaly the auth can get stuck only in host
     * this especially happens in cases like
     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
     */
    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.hostname = authInHost.shift();
      result.host = result.hostname;
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (srcPath.length > 0) {
    result.pathname = srcPath.join('/');
  } else {
    result.pathname = null;
    result.path = null;
  }

  // to support request.http
  if (result.pathname !== null || result.search !== null) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {

module.exports.maxScreenWidth = 1920, module.exports.maxScreenHeight = 1080, module.exports.serverUpdateRate = 9, module.exports.maxPlayers = 40, module.exports.maxPlayersHard = module.exports.maxPlayers + 10, module.exports.collisionDepth = 6, module.exports.minimapRate = 3000, module.exports.colGrid = 10, module.exports.clientSendRate = 5, module.exports.healthBarWidth = 50, module.exports.healthBarPad = 4.5, module.exports.iconPadding = 15, module.exports.iconPad = 0.9, module.exports.deathFadeout = 3000, module.exports.crownIconScale = 60, module.exports.crownPad = 35, module.exports.chatCountdown = 3000, module.exports.chatCooldown = 500, module.exports.inSandbox = true, module.exports.maxAge = 100, module.exports.gatherAngle = Math.PI / 2.6, module.exports.gatherWiggle = 10, module.exports.hitReturnRatio = 0.25, module.exports.hitAngle = Math.PI / 2, module.exports.playerScale = 35, module.exports.playerSpeed = 0.0016, module.exports.playerDecel = 0.993, module.exports.nameY = 34, module.exports.skinColors = [
	'#bf8f54',
	'#cbb091',
	'#896c4b',
	'#fadadc',
	'#ececec',
	'#c37373',
	'#4c4c4c',
	'#ecaff7',
	'#738cc3',
	'#8bc373'
], module.exports.animalCount = 7, module.exports.aiTurnRandom = 0.06, module.exports.cowNames = [
	'Sid',
	'Steph',
	'Bmoe',
	'Romn',
	'Jononthecool',
	'Fiona',
	'Vince',
	'Nathan',
	'Nick',
	'Flappy',
	'Ronald',
	'Otis',
	'Pepe',
	'Mc Donald',
	'Theo',
	'Fabz',
	'Oliver',
	'Jeff',
	'Jimmy',
	'Helena',
	'Reaper',
	'Ben',
	'Alan',
	'Naomi',
	'XYZ',
	'Clever',
	'Jeremy',
	'Mike',
	'Destined',
	'Stallion',
	'Allison',
	'Meaty',
	'Sophia',
	'Vaja',
	'Joey',
	'Pendy',
	'Murdoch',
	'Theo',
	'Jared',
	'July',
	'Sonia',
	'Mel',
	'Dexter',
	'Quinn',
	'Milky'
], module.exports.shieldAngle = Math.PI / 3, module.exports.weaponVariants = [{
		id: 0,
		src: '',
		xp: 0,
		val: 1
	},
	{
		id: 1,
		src: '_g',
		xp: 1000,
		val: 1.1
	},
	{
		id: 2,
		src: '_d',
		xp: 1750,
		val: 1.18
	},
	{
		id: 3,
		src: '_r',
		poison: !0,
		xp: 2500,
		val: 1.18
	},
	{
		id: 4,
		src: '_e',
		xp: 3000,
		val: 1.25
	}
], module.exports.fetchVariant = function(player) {
	for (var tmpXP = player.weaponXP[player.weaponIndex] || 0, i = module.exports.weaponVariants.length - 1; i >= 0; --i)
		if (tmpXP >= module.exports.weaponVariants[i].xp)
			return module.exports.weaponVariants[i];
}, module.exports.resourceTypes = [
	'wood',
	'food',
	'stone',
	'points'
], module.exports.areaCount = 7, module.exports.treesPerArea = 9, module.exports.bushesPerArea = 3, module.exports.totalRocks = 32, module.exports.goldOres = 7, module.exports.riverWidth = 724, module.exports.riverPadding = 114, module.exports.waterCurrent = 0.0011, module.exports.waveSpeed = 0.0001, module.exports.waveMax = 1.3, module.exports.treeScales = [
	150,
	160,
	165,
	175
], module.exports.bushScales = [
	80,
	85,
	95
], module.exports.rockScales = [
	80,
	85,
	90
], module.exports.snowBiomeTop = 2400, module.exports.snowSpeed = 0.75, module.exports.maxNameLength = 15, module.exports.mapScale = 14400, module.exports.mapPingScale = 40, module.exports.mapPingTime = 2200;

/***/ }),

/***/ "./src/js/data/ai.js":
/*!***************************!*\
  !*** ./src/js/data/ai.js ***!
  \***************************/
/***/ ((module) => {

var PI2 = 2 * Math.PI;
module.exports = function (sid, objectManager, players, items, UTILS, config, scoreCallback, server) {
  this.sid = sid, this.isAI = !0, this.nameIndex = UTILS.randInt(0, config.cowNames.length - 1), this.init = function (x, y, dir, index, data) {
    this.x = x, this.y = y, this.startX = data.fixedSpawn ? x : null, this.startY = data.fixedSpawn ? y : null, this.xVel = 0, this.yVel = 0, this.zIndex = 0, this.dir = dir, this.dirPlus = 0, this.index = index, this.src = data.src, data.name && (this.name = data.name), this.weightM = data.weightM, this.speed = data.speed, this.killScore = data.killScore, this.turnSpeed = data.turnSpeed, this.scale = data.scale, this.maxHealth = data.health, this.leapForce = data.leapForce, this.health = this.maxHealth, this.chargePlayer = data.chargePlayer, this.viewRange = data.viewRange, this.drop = data.drop, this.dmg = data.dmg, this.hostile = data.hostile, this.dontRun = data.dontRun, this.hitRange = data.hitRange, this.hitDelay = data.hitDelay, this.hitScare = data.hitScare, this.spriteMlt = data.spriteMlt, this.nameScale = data.nameScale, this.colDmg = data.colDmg, this.noTrap = data.noTrap, this.spawnDelay = data.spawnDelay, this.hitWait = 0, this.waitCount = 1000, this.moveCount = 0, this.targetDir = 0, this.active = !0, this.alive = !0, this.runFrom = null, this.chargeTarget = null, this.dmgOverTime = {};
  };
  var timerCount = 0;
  this.update = function (delta) {
    if (this.active) {
      if (this.spawnCounter)
        return this.spawnCounter -= delta, void(this.spawnCounter <= 0 && (this.spawnCounter = 0, this.x = this.startX || UTILS.randInt(0, config.mapScale), this.y = this.startY || UTILS.randInt(0, config.mapScale)));
      (timerCount -= delta) <= 0 && (this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer), this.dmgOverTime.time -= 1, this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)), timerCount = 1000);
      var charging = !1,
        slowMlt = 1;
      if (!this.zIndex && !this.lockMove && this.y >= config.mapScale / 2 - config.riverWidth / 2 && this.y <= config.mapScale / 2 + config.riverWidth / 2 && (slowMlt = 0.33, this.xVel += config.waterCurrent * delta), this.lockMove)
        this.xVel = 0, this.yVel = 0;
      else if (this.waitCount > 0) {
        if (this.waitCount -= delta, this.waitCount <= 0)
          if (this.chargePlayer) {
            for (var tmpPlayer, bestDst, tmpDist, i = 0; i < players.length; ++i)
              !players[i].alive || players[i].skin && players[i].skin.bullRepel || (tmpDist = UTILS.getDistance(this.x, this.y, players[i].x, players[i].y)) <= this.viewRange && (!tmpPlayer || tmpDist < bestDst) && (bestDst = tmpDist, tmpPlayer = players[i]);
            tmpPlayer ? (this.chargeTarget = tmpPlayer, this.moveCount = UTILS.randInt(8000, 12000)) : (this.moveCount = UTILS.randInt(1000, 2000), this.targetDir = UTILS.randFloat(-Math.PI, Math.PI));
          } else
            this.moveCount = UTILS.randInt(4000, 10000), this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
      } else if (this.moveCount > 0) {
        var tmpSpd = this.speed * slowMlt;
        if (this.runFrom && this.runFrom.active && (!this.runFrom.isPlayer || this.runFrom.alive) ? (this.targetDir = UTILS.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y), tmpSpd *= 1.42) : this.chargeTarget && this.chargeTarget.alive && (this.targetDir = UTILS.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y), tmpSpd *= 1.75, charging = !0), this.hitWait && (tmpSpd *= 0.3), this.dir != this.targetDir) {
          this.dir %= PI2;
          var netAngle = (this.dir - this.targetDir + PI2) % PI2,
            amnt = Math.min(Math.abs(netAngle - PI2), netAngle, this.turnSpeed * delta),
            sign = netAngle - Math.PI >= 0 ? 1 : -1;
          this.dir += sign * amnt + PI2;
        }
        this.dir %= PI2, this.xVel += tmpSpd * delta * Math.cos(this.dir), this.yVel += tmpSpd * delta * Math.sin(this.dir), this.moveCount -= delta, this.moveCount <= 0 && (this.runFrom = null, this.chargeTarget = null, this.waitCount = this.hostile ? 1500 : UTILS.randInt(1500, 6000));
      }
      this.zIndex = 0, this.lockMove = !1;
      var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta),
        depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40))),
        tMlt = 1 / depth;
      for (i = 0; i < depth; ++i) {
        this.xVel && (this.x += this.xVel * delta * tMlt), this.yVel && (this.y += this.yVel * delta * tMlt), tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
        for (var x = 0; x < tmpList.length; ++x)
          for (var y = 0; y < tmpList[x].length; ++y)
            tmpList[x][y].active && objectManager.checkCollision(this, tmpList[x][y], tMlt);
      }
      var tmpObj, tmpDst, tmpDir, hitting = !1;
      if (this.hitWait > 0 && (this.hitWait -= delta, this.hitWait <= 0)) {
        hitting = !0, this.hitWait = 0, this.leapForce && !UTILS.randInt(0, 2) && (this.xVel += this.leapForce * Math.cos(this.dir), this.yVel += this.leapForce * Math.sin(this.dir));
        for (var tmpList = objectManager.getGridArrays(this.x, this.y, this.hitRange), t = 0; t < tmpList.length; ++t)
          for (x = 0; x < tmpList[t].length; ++x)
            (tmpObj = tmpList[t][x])
            .health && (tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y)) < tmpObj.scale + this.hitRange && (tmpObj.changeHealth(5 * -this.dmg) && objectManager.disableObj(tmpObj), objectManager.hitObj(tmpObj, UTILS.getDirection(this.x, this.y, tmpObj.x, tmpObj.y)));
        for (x = 0; x < players.length; ++x)
          players[x].canSee(this) && server.send(players[x].id, 'aa', this.sid);
      }
      if (charging || hitting)
        for (i = 0; i < players.length; ++i)
          (tmpObj = players[i]) && tmpObj.alive && (tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y), this.hitRange ? !this.hitWait && tmpDst <= this.hitRange + tmpObj.scale && (hitting ? (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), tmpObj.changeHealth(-this.dmg), tmpObj.xVel += 0.6 * Math.cos(tmpDir), tmpObj.yVel += 0.6 * Math.sin(tmpDir), this.runFrom = null, this.chargeTarget = null, this.waitCount = 3000, this.hitWait = UTILS.randInt(0, 2) ? 0 : 600) : this.hitWait = this.hitDelay) : tmpDst <= this.scale + tmpObj.scale && (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), tmpObj.changeHealth(-this.dmg), tmpObj.xVel += 0.55 * Math.cos(tmpDir), tmpObj.yVel += 0.55 * Math.sin(tmpDir)));
      this.xVel && (this.xVel *= Math.pow(config.playerDecel, delta)), this.yVel && (this.yVel *= Math.pow(config.playerDecel, delta));
      var tmpScale = this.scale;
      this.x - tmpScale < 0 ? (this.x = tmpScale, this.xVel = 0) : this.x + tmpScale > config.mapScale && (this.x = config.mapScale - tmpScale, this.xVel = 0), this.y - tmpScale < 0 ? (this.y = tmpScale, this.yVel = 0) : this.y + tmpScale > config.mapScale && (this.y = config.mapScale - tmpScale, this.yVel = 0);
    }
  }, this.canSee = function (other) {
    if (!other)
      return !1;
    if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer)
      return !1;
    var dx = Math.abs(other.x - this.x) - other.scale,
      dy = Math.abs(other.y - this.y) - other.scale;
    return dx <= config.maxScreenWidth / 2 * 1.3 && dy <= config.maxScreenHeight / 2 * 1.3;
  };
  var tmpRatio = 0,
    animIndex = 0;
  this.animate = function (delta) {
    this.animTime > 0 && (this.animTime -= delta, this.animTime <= 0 ? (this.animTime = 0, this.dirPlus = 0, tmpRatio = 0, animIndex = 0) : 0 == animIndex ? (tmpRatio += delta / (this.animSpeed * config.hitReturnRatio), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio)), tmpRatio >= 1 && (tmpRatio = 1, animIndex = 1)) : (tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio)), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio))));
  }, this.startAnim = function () {
    this.animTime = this.animSpeed = 600, this.targetAngle = 0.8 * Math.PI, tmpRatio = 0, animIndex = 0;
  }, this.changeHealth = function (val, doer, runFrom) {
    if (this.active && (this.health += val, runFrom && (this.hitScare && !UTILS.randInt(0, this.hitScare) ? (this.runFrom = runFrom, this.waitCount = 0, this.moveCount = 2000) : this.hostile && this.chargePlayer && runFrom.isPlayer ? (this.chargeTarget = runFrom, this.waitCount = 0, this.moveCount = 8000) : this.dontRun || (this.runFrom = runFrom, this.waitCount = 0, this.moveCount = 2000)), val < 0 && this.hitRange && UTILS.randInt(0, 1) && (this.hitWait = 500), doer && doer.canSee(this) && val < 0 && server.send(doer.id, 't', Math.round(this.x), Math.round(this.y), Math.round(-val), 1), this.health <= 0 && (this.spawnDelay ? (this.spawnCounter = this.spawnDelay, this.x = -1000000, this.y = -1000000) : (this.x = this.startX || UTILS.randInt(0, config.mapScale), this.y = this.startY || UTILS.randInt(0, config.mapScale)), this.health = this.maxHealth, this.runFrom = null, doer && (scoreCallback(doer, this.killScore), this.drop))))
      for (var i = 0; i < this.drop.length;)
        doer.addResource(config.resourceTypes.indexOf(this.drop[i]), this.drop[i + 1]), i += 2;
  };
};

/***/ }),

/***/ "./src/js/data/aiManager.js":
/*!**********************************!*\
  !*** ./src/js/data/aiManager.js ***!
  \**********************************/
/***/ ((module) => {

module.exports = function (ais, AI, players, items, objectManager, config, UTILS, scoreCallback, server) {
  this.aiTypes = [{
      id: 0,
      src: 'cow_1',
      killScore: 150,
      health: 500,
      weightM: 0.8,
      speed: 0.00095,
      turnSpeed: 0.001,
      scale: 72,
      drop: [
        'food',
        50
      ]
    },
    {
      id: 1,
      src: 'pig_1',
      killScore: 200,
      health: 800,
      weightM: 0.6,
      speed: 0.00085,
      turnSpeed: 0.001,
      scale: 72,
      drop: [
        'food',
        80
      ]
    },
    {
      id: 2,
      name: 'Bull',
      src: 'bull_2',
      hostile: !0,
      dmg: 20,
      killScore: 1000,
      health: 1800,
      weightM: 0.5,
      speed: 0.00094,
      turnSpeed: 0.00074,
      scale: 78,
      viewRange: 800,
      chargePlayer: !0,
      drop: [
        'food',
        100
      ]
    },
    {
      id: 3,
      name: 'Bully',
      src: 'bull_1',
      hostile: !0,
      dmg: 20,
      killScore: 2000,
      health: 2800,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 0.0008,
      scale: 90,
      viewRange: 900,
      chargePlayer: !0,
      drop: [
        'food',
        400
      ]
    },
    {
      id: 4,
      name: 'Wolf',
      src: 'wolf_1',
      hostile: !0,
      dmg: 8,
      killScore: 500,
      health: 300,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 0.002,
      scale: 84,
      viewRange: 800,
      chargePlayer: !0,
      drop: [
        'food',
        200
      ]
    },
    {
      id: 5,
      name: 'Quack',
      src: 'chicken_1',
      dmg: 8,
      killScore: 2000,
      noTrap: !0,
      health: 300,
      weightM: 0.2,
      speed: 0.0018,
      turnSpeed: 0.006,
      scale: 70,
      drop: [
        'food',
        100
      ]
    },
    {
      id: 6,
      name: 'MOOSTAFA',
      nameScale: 50,
      src: 'enemy',
      hostile: !0,
      dontRun: !0,
      fixedSpawn: !0,
      spawnDelay: 60000,
      noTrap: !0,
      colDmg: 100,
      dmg: 40,
      killScore: 8000,
      health: 18000,
      weightM: 0.4,
      speed: 0.0007,
      turnSpeed: 0.01,
      scale: 80,
      spriteMlt: 1.8,
      leapForce: 0.9,
      viewRange: 1000,
      hitRange: 210,
      hitDelay: 1000,
      chargePlayer: !0,
      drop: [
        'food',
        100
      ]
    },
    {
      id: 7,
      name: 'Treasure',
      hostile: !0,
      nameScale: 35,
      src: 'crate_1',
      fixedSpawn: !0,
      spawnDelay: 120000,
      colDmg: 200,
      killScore: 5000,
      health: 20000,
      weightM: 0.1,
      speed: 0,
      turnSpeed: 0,
      scale: 70,
      spriteMlt: 1
    },
    {
      id: 8,
      name: 'MOOFIE',
      src: 'wolf_2',
      hostile: !0,
      fixedSpawn: !0,
      dontRun: !0,
      hitScare: 4,
      spawnDelay: 30000,
      noTrap: !0,
      nameScale: 35,
      dmg: 10,
      colDmg: 100,
      killScore: 3000,
      health: 7000,
      weightM: 0.45,
      speed: 0.0015,
      turnSpeed: 0.002,
      scale: 90,
      viewRange: 800,
      chargePlayer: !0,
      drop: [
        'food',
        1000
      ]
    }
  ], this.spawn = function (x, y, dir, index) {
    for (var tmpObj, i = 0; i < ais.length; ++i)
      if (!ais[i].active) {
        tmpObj = ais[i];
        break;
      }
    return tmpObj || (tmpObj = new AI(ais.length, objectManager, players, items, UTILS, config, scoreCallback, server), ais.push(tmpObj)), tmpObj.init(x, y, dir, index, this.aiTypes[index]), tmpObj;
  };
};

/***/ }),

/***/ "./src/js/data/gameObject.js":
/*!***********************************!*\
  !*** ./src/js/data/gameObject.js ***!
  \***********************************/
/***/ ((module) => {

module.exports = function (sid) {
  this.sid = sid, this.init = function (x, y, dir, scale, type, data, owner) {
    data = data || {}, this.sentTo = {}, this.gridLocations = [], this.active = !0, this.doUpdate = data.doUpdate, this.x = x, this.y = y, this.dir = dir, this.xWiggle = 0, this.yWiggle = 0, this.scale = scale, this.type = type, this.id = data.id, this.owner = owner, this.name = data.name, this.isItem = null != this.id, this.group = data.group, this.health = data.health, this.layer = 2, null != this.group ? this.layer = this.group.layer : 0 == this.type ? this.layer = 3 : 2 == this.type ? this.layer = 0 : 4 == this.type && (this.layer = -1), this.colDiv = data.colDiv || 1, this.blocker = data.blocker, this.ignoreCollision = data.ignoreCollision, this.dontGather = data.dontGather, this.hideFromEnemy = data.hideFromEnemy, this.friction = data.friction, this.projDmg = data.projDmg, this.dmg = data.dmg, this.pDmg = data.pDmg, this.pps = data.pps, this.zIndex = data.zIndex || 0, this.turnSpeed = data.turnSpeed, this.req = data.req, this.trap = data.trap, this.healCol = data.healCol, this.teleport = data.teleport, this.boostSpeed = data.boostSpeed, this.projectile = data.projectile, this.shootRange = data.shootRange, this.shootRate = data.shootRate, this.shootCount = this.shootRate, this.spawnPoint = data.spawnPoint;
  }, this.changeHealth = function (amount, doer) {
    return this.health += amount, this.health <= 0;
  }, this.getScale = function (sM, ig) {
    return sM = sM || 1, this.scale * (this.isItem || 2 == this.type || 3 == this.type || 4 == this.type ? 1 : 0.6 * sM) * (ig ? 1 : this.colDiv);
  }, this.visibleToPlayer = function (player) {
    return !this.hideFromEnemy || this.owner && (this.owner == player || this.owner.team && player.team == this.owner.team);
  }, this.update = function (delta) {
    this.active && (this.xWiggle && (this.xWiggle *= Math.pow(0.99, delta)), this.yWiggle && (this.yWiggle *= Math.pow(0.99, delta)), this.turnSpeed && (this.dir += this.turnSpeed * delta));
  };
};

/***/ }),

/***/ "./src/js/data/items.js":
/*!******************************!*\
  !*** ./src/js/data/items.js ***!
  \******************************/
/***/ ((module, exports) => {

module.exports.groups = [{
    id: 0,
    name: 'food',
    layer: 0
  },
  {
    id: 1,
    name: 'walls',
    place: !0,
    limit: 30,
    layer: 0
  },
  {
    id: 2,
    name: 'spikes',
    place: !0,
    limit: 15,
    layer: 0
  },
  {
    id: 3,
    name: 'mill',
    place: !0,
    limit: 7,
    layer: 1
  },
  {
    id: 4,
    name: 'mine',
    place: !0,
    limit: 1,
    layer: 0
  },
  {
    id: 5,
    name: 'trap',
    place: !0,
    limit: 6,
    layer: -1
  },
  {
    id: 6,
    name: 'booster',
    place: !0,
    limit: 12,
    layer: -1
  },
  {
    id: 7,
    name: 'turret',
    place: !0,
    limit: 2,
    layer: 1
  },
  {
    id: 8,
    name: 'watchtower',
    place: !0,
    limit: 12,
    layer: 1
  },
  {
    id: 9,
    name: 'buff',
    place: !0,
    limit: 4,
    layer: -1
  },
  {
    id: 10,
    name: 'spawn',
    place: !0,
    limit: 1,
    layer: -1
  },
  {
    id: 11,
    name: 'sapling',
    place: !0,
    limit: 2,
    layer: 0
  },
  {
    id: 12,
    name: 'blocker',
    place: !0,
    limit: 3,
    layer: -1
  },
  {
    id: 13,
    name: 'teleporter',
    place: !0,
    limit: 2,
    layer: -1
  }
], exports.projectiles = [{
    indx: 0,
    layer: 0,
    src: 'arrow_1',
    dmg: 25,
    speed: 1.6,
    scale: 103,
    range: 1000
  },
  {
    indx: 1,
    layer: 1,
    dmg: 25,
    scale: 20
  },
  {
    indx: 0,
    layer: 0,
    src: 'arrow_1',
    dmg: 35,
    speed: 2.5,
    scale: 103,
    range: 1200
  },
  {
    indx: 0,
    layer: 0,
    src: 'arrow_1',
    dmg: 30,
    speed: 2,
    scale: 103,
    range: 1200
  },
  {
    indx: 1,
    layer: 1,
    dmg: 16,
    scale: 20
  },
  {
    indx: 0,
    layer: 0,
    src: 'bullet_1',
    dmg: 50,
    speed: 3.6,
    scale: 160,
    range: 1400
  }
], module.exports.weapons = [{
    id: 0,
    type: 0,
    name: 'tool hammer',
    desc: 'tool for gathering all resources',
    src: 'hammer_1',
    length: 140,
    width: 140,
    xOff: -3,
    yOff: 18,
    dmg: 25,
    range: 65,
    gather: 1,
    speed: 300
  },
  {
    id: 1,
    type: 0,
    age: 2,
    name: 'hand axe',
    desc: 'gathers resources at a higher rate',
    src: 'axe_1',
    length: 140,
    width: 140,
    xOff: 3,
    yOff: 24,
    dmg: 30,
    spdMult: 1,
    range: 70,
    gather: 2,
    speed: 400
  },
  {
    id: 2,
    type: 0,
    age: 8,
    pre: 1,
    name: 'great axe',
    desc: 'deal more damage and gather more resources',
    src: 'great_axe_1',
    length: 140,
    width: 140,
    xOff: -8,
    yOff: 25,
    dmg: 35,
    spdMult: 1,
    range: 75,
    gather: 4,
    speed: 400
  },
  {
    id: 3,
    type: 0,
    age: 2,
    name: 'short sword',
    desc: 'increased attack power but slower move speed',
    src: 'sword_1',
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 46,
    dmg: 35,
    spdMult: 0.85,
    range: 110,
    gather: 1,
    speed: 300
  },
  {
    id: 4,
    type: 0,
    age: 8,
    pre: 3,
    name: 'katana',
    desc: 'greater range and damage',
    src: 'samurai_1',
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 59,
    dmg: 40,
    spdMult: 0.8,
    range: 118,
    gather: 1,
    speed: 300
  },
  {
    id: 5,
    type: 0,
    age: 2,
    name: 'polearm',
    desc: 'long range melee weapon',
    src: 'spear_1',
    iPad: 1.3,
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 53,
    dmg: 45,
    knock: 0.2,
    spdMult: 0.82,
    range: 142,
    gather: 1,
    speed: 700
  },
  {
    id: 6,
    type: 0,
    age: 2,
    name: 'bat',
    desc: 'fast long range melee weapon',
    src: 'bat_1',
    iPad: 1.3,
    length: 110,
    width: 180,
    xOff: -8,
    yOff: 53,
    dmg: 20,
    knock: 0.7,
    range: 110,
    gather: 1,
    speed: 300
  },
  {
    id: 7,
    type: 0,
    age: 2,
    name: 'daggers',
    desc: 'really fast short range weapon',
    src: 'dagger_1',
    iPad: 0.8,
    length: 110,
    width: 110,
    xOff: 18,
    yOff: 0,
    dmg: 20,
    knock: 0.1,
    range: 65,
    gather: 1,
    hitSlow: 0.1,
    spdMult: 1.13,
    speed: 100
  },
  {
    id: 8,
    type: 0,
    age: 2,
    name: 'stick',
    desc: 'great for gathering but very weak',
    src: 'stick_1',
    length: 140,
    width: 140,
    xOff: 3,
    yOff: 24,
    dmg: 1,
    spdMult: 1,
    range: 70,
    gather: 7,
    speed: 400
  },
  {
    id: 9,
    type: 1,
    age: 6,
    name: 'hunting bow',
    desc: 'bow used for ranged combat and hunting',
    src: 'bow_1',
    req: [
      'wood',
      4
    ],
    length: 120,
    width: 120,
    xOff: -6,
    yOff: 0,
    projectile: 0,
    spdMult: 0.75,
    speed: 600
  },
  {
    id: 10,
    type: 1,
    age: 6,
    name: 'great hammer',
    desc: 'hammer used for destroying structures',
    src: 'great_hammer_1',
    length: 140,
    width: 140,
    xOff: -9,
    yOff: 25,
    dmg: 10,
    spdMult: 0.88,
    range: 75,
    sDmg: 7.5,
    gather: 1,
    speed: 400
  },
  {
    id: 11,
    type: 1,
    age: 6,
    name: 'wooden shield',
    desc: 'blocks projectiles and reduces melee damage',
    src: 'shield_1',
    length: 120,
    width: 120,
    shield: 0.2,
    xOff: 6,
    yOff: 0,
    spdMult: 0.7
  },
  {
    id: 12,
    type: 1,
    age: 8,
    pre: 9,
    name: 'crossbow',
    desc: 'deals more damage and has greater range',
    src: 'crossbow_1',
    req: [
      'wood',
      5
    ],
    aboveHand: !0,
    armS: 0.75,
    length: 120,
    width: 120,
    xOff: -4,
    yOff: 0,
    projectile: 2,
    spdMult: 0.7,
    speed: 700
  },
  {
    id: 13,
    type: 1,
    age: 9,
    pre: 12,
    name: 'repeater crossbow',
    desc: 'high firerate crossbow with reduced damage',
    src: 'crossbow_2',
    req: [
      'wood',
      10
    ],
    aboveHand: !0,
    armS: 0.75,
    length: 120,
    width: 120,
    xOff: -4,
    yOff: 0,
    projectile: 3,
    spdMult: 0.7,
    speed: 230
  },
  {
    id: 14,
    type: 1,
    age: 6,
    name: 'mc grabby',
    desc: 'steals resources from enemies',
    src: 'grab_1',
    length: 130,
    width: 210,
    xOff: -8,
    yOff: 53,
    dmg: 0,
    steal: 250,
    knock: 0.2,
    spdMult: 1.05,
    range: 125,
    gather: 0,
    speed: 700
  },
  {
    id: 15,
    type: 1,
    age: 9,
    pre: 12,
    name: 'musket',
    desc: 'slow firerate but high damage and range',
    src: 'musket_1',
    req: [
      'stone',
      10
    ],
    aboveHand: !0,
    rec: 0.35,
    armS: 0.6,
    hndS: 0.3,
    hndD: 1.6,
    length: 205,
    width: 205,
    xOff: 25,
    yOff: 0,
    projectile: 5,
    hideProjectile: !0,
    spdMult: 0.6,
    speed: 1500
  }
], module.exports.list = [{
    group: module.exports.groups[0],
    name: 'apple',
    desc: 'restores 20 health when consumed',
    req: [
      'food',
      10
    ],
    consume: function (doer) {
      return doer.changeHealth(20, doer);
    },
    scale: 22,
    holdOffset: 15
  },
  {
    age: 3,
    group: module.exports.groups[0],
    name: 'cookie',
    desc: 'restores 40 health when consumed',
    req: [
      'food',
      15
    ],
    consume: function (doer) {
      return doer.changeHealth(40, doer);
    },
    scale: 27,
    holdOffset: 15
  },
  {
    age: 7,
    group: module.exports.groups[0],
    name: 'cheese',
    desc: 'restores 30 health and another 50 over 5 seconds',
    req: [
      'food',
      25
    ],
    consume: function (doer) {
      return !!(doer.changeHealth(30, doer) || doer.health < 100) && (doer.dmgOverTime.dmg = -10, doer.dmgOverTime.doer = doer, doer.dmgOverTime.time = 5, !0);
    },
    scale: 27,
    holdOffset: 15
  },
  {
    group: module.exports.groups[1],
    name: 'wood wall',
    desc: 'provides protection for your village',
    req: [
      'wood',
      10
    ],
    projDmg: !0,
    health: 380,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 3,
    group: module.exports.groups[1],
    name: 'stone wall',
    desc: 'provides improved protection for your village',
    req: [
      'stone',
      25
    ],
    health: 900,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    pre: 1,
    group: module.exports.groups[1],
    name: 'castle wall',
    desc: 'provides powerful protection for your village',
    req: [
      'stone',
      35
    ],
    health: 1500,
    scale: 52,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    group: module.exports.groups[2],
    name: 'spikes',
    desc: 'damages enemies when they touch them',
    req: [
      'wood',
      20,
      'stone',
      5
    ],
    health: 400,
    dmg: 20,
    scale: 49,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5
  },
  {
    age: 5,
    group: module.exports.groups[2],
    name: 'greater spikes',
    desc: 'damages enemies when they touch them',
    req: [
      'wood',
      30,
      'stone',
      10
    ],
    health: 500,
    dmg: 35,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5
  },
  {
    age: 9,
    pre: 1,
    group: module.exports.groups[2],
    name: 'poison spikes',
    desc: 'poisons enemies when they touch them',
    req: [
      'wood',
      35,
      'stone',
      15
    ],
    health: 600,
    dmg: 30,
    pDmg: 5,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5
  },
  {
    age: 9,
    pre: 2,
    group: module.exports.groups[2],
    name: 'spinning spikes',
    desc: 'damages enemies when they touch them',
    req: [
      'wood',
      30,
      'stone',
      20
    ],
    health: 500,
    dmg: 45,
    turnSpeed: 0.003,
    scale: 52,
    spritePadding: -23,
    holdOffset: 8,
    placeOffset: -5
  },
  {
    group: module.exports.groups[3],
    name: 'windmill',
    desc: 'generates gold over time',
    req: [
      'wood',
      50,
      'stone',
      10
    ],
    health: 400,
    pps: 1,
    turnSpeed: 0.0016,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 45,
    holdOffset: 20,
    placeOffset: 5
  },
  {
    age: 5,
    pre: 1,
    group: module.exports.groups[3],
    name: 'faster windmill',
    desc: 'generates more gold over time',
    req: [
      'wood',
      60,
      'stone',
      20
    ],
    health: 500,
    pps: 1.5,
    turnSpeed: 0.0025,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 47,
    holdOffset: 20,
    placeOffset: 5
  },
  {
    age: 8,
    pre: 1,
    group: module.exports.groups[3],
    name: 'power mill',
    desc: 'generates more gold over time',
    req: [
      'wood',
      100,
      'stone',
      50
    ],
    health: 800,
    pps: 2,
    turnSpeed: 0.005,
    spritePadding: 25,
    iconLineMult: 12,
    scale: 47,
    holdOffset: 20,
    placeOffset: 5
  },
  {
    age: 5,
    group: module.exports.groups[4],
    type: 2,
    name: 'mine',
    desc: 'allows you to mine stone',
    req: [
      'wood',
      20,
      'stone',
      100
    ],
    iconLineMult: 12,
    scale: 65,
    holdOffset: 20,
    placeOffset: 0
  },
  {
    age: 5,
    group: module.exports.groups[11],
    type: 0,
    name: 'sapling',
    desc: 'allows you to farm wood',
    req: [
      'wood',
      150
    ],
    iconLineMult: 12,
    colDiv: 0.5,
    scale: 110,
    holdOffset: 50,
    placeOffset: -15
  },
  {
    age: 4,
    group: module.exports.groups[5],
    name: 'pit trap',
    desc: 'pit that traps enemies if they walk over it',
    req: [
      'wood',
      30,
      'stone',
      30
    ],
    trap: !0,
    ignoreCollision: !0,
    hideFromEnemy: !0,
    health: 500,
    colDiv: 0.2,
    scale: 50,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 4,
    group: module.exports.groups[6],
    name: 'boost pad',
    desc: 'provides boost when stepped on',
    req: [
      'stone',
      20,
      'wood',
      5
    ],
    ignoreCollision: !0,
    boostSpeed: 1.5,
    health: 150,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    group: module.exports.groups[7],
    doUpdate: !0,
    name: 'turret',
    desc: 'defensive structure that shoots at enemies',
    req: [
      'wood',
      200,
      'stone',
      150
    ],
    health: 800,
    projectile: 1,
    shootRange: 700,
    shootRate: 2200,
    scale: 43,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    group: module.exports.groups[8],
    name: 'platform',
    desc: 'platform to shoot over walls and cross over water',
    req: [
      'wood',
      20
    ],
    ignoreCollision: !0,
    zIndex: 1,
    health: 300,
    scale: 43,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    group: module.exports.groups[9],
    name: 'healing pad',
    desc: 'standing on it will slowly heal you',
    req: [
      'wood',
      30,
      'food',
      10
    ],
    ignoreCollision: !0,
    healCol: 15,
    health: 400,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 9,
    group: module.exports.groups[10],
    name: 'spawn pad',
    desc: 'you will spawn here when you die but it will dissapear',
    req: [
      'wood',
      100,
      'stone',
      100
    ],
    health: 400,
    ignoreCollision: !0,
    spawnPoint: !0,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    group: module.exports.groups[12],
    name: 'blocker',
    desc: 'blocks building in radius',
    req: [
      'wood',
      30,
      'stone',
      25
    ],
    ignoreCollision: !0,
    blocker: 300,
    health: 400,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  },
  {
    age: 7,
    group: module.exports.groups[13],
    name: 'teleporter',
    desc: 'teleports you to a random point on the map',
    req: [
      'wood',
      60,
      'stone',
      60
    ],
    ignoreCollision: !0,
    teleport: !0,
    health: 200,
    colDiv: 0.7,
    scale: 45,
    holdOffset: 20,
    placeOffset: -5
  }
];
for (var i = 0; i < module.exports.list.length; ++i)
  module.exports.list[i].id = i, module.exports.list[i].pre && (module.exports.list[i].pre = i - module.exports.list[i].pre);

/***/ }),

/***/ "./src/js/data/mapManager.js":
/*!***********************************!*\
  !*** ./src/js/data/mapManager.js ***!
  \***********************************/
/***/ ((module) => {

module.exports = {};

const ctx = console.context();

if ("log" in ctx) {
  ctx.log("This script is made using Illya#9999's bundle processor, debundled by 0xffabc");
}

/***/ }),

/***/ "./src/js/data/objectManager.js":
/*!**************************************!*\
  !*** ./src/js/data/objectManager.js ***!
  \**************************************/
/***/ ((module) => {

var mathFloor = Math.floor,
  mathABS = Math.abs,
  mathCOS = Math.cos,
  mathSIN = Math.sin,
  mathSQRT = (Math.pow, Math.sqrt);
module.exports = function (GameObject, gameObjects, UTILS, config, players, server) {
  var tmpX, tmpY;
  this.objects = gameObjects, this.grids = {}, this.updateObjects = [];
  var tmpS = config.mapScale / config.colGrid;
  this.setObjectGrids = function (obj) {
    for (var objX = Math.min(config.mapScale, Math.max(0, obj.x)), objY = Math.min(config.mapScale, Math.max(0, obj.y)), x = 0; x < config.colGrid; ++x) {
      tmpX = x * tmpS;
      for (var y = 0; y < config.colGrid; ++y)
        tmpY = y * tmpS, objX + obj.scale >= tmpX && objX - obj.scale <= tmpX + tmpS && objY + obj.scale >= tmpY && objY - obj.scale <= tmpY + tmpS && (this.grids[x + '_' + y] || (this.grids[x + '_' + y] = []), this.grids[x + '_' + y].push(obj), obj.gridLocations.push(x + '_' + y));
    }
  }, this.removeObjGrid = function (obj) {
    for (var tmpIndx, i = 0; i < obj.gridLocations.length; ++i)
      (tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj)) >= 0 && this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
  }, this.disableObj = function (obj) {
    if (obj.active = !1, server) {
      obj.owner && obj.pps && (obj.owner.pps -= obj.pps), this.removeObjGrid(obj);
      var tmpIndx = this.updateObjects.indexOf(obj);
      tmpIndx >= 0 && this.updateObjects.splice(tmpIndx, 1);
    }
  }, this.hitObj = function (tmpObj, tmpDir) {
    for (var p = 0; p < players.length; ++p)
      players[p].active && (tmpObj.sentTo[players[p].id] && (tmpObj.active ? players[p].canSee(tmpObj) && server.send(players[p].id, '8', UTILS.fixTo(tmpDir, 1), tmpObj.sid) : server.send(players[p].id, '12', tmpObj.sid)), tmpObj.active || tmpObj.owner != players[p] || players[p].changeItemCount(tmpObj.group.id, -1));
  };
  var tmpGrid, tmpObj, tmpArray = [];
  this.getGridArrays = function (xPos, yPos, s) {
    tmpX = mathFloor(xPos / tmpS), tmpY = mathFloor(yPos / tmpS), tmpArray.length = 0;
    try {
      this.grids[tmpX + '_' + tmpY] && tmpArray.push(this.grids[tmpX + '_' + tmpY]), xPos + s >= (tmpX + 1) * tmpS && ((tmpGrid = this.grids[tmpX + 1 + '_' + tmpY]) && tmpArray.push(tmpGrid), tmpY && yPos - s <= tmpY * tmpS ? (tmpGrid = this.grids[tmpX + 1 + '_' + (tmpY - 1)]) && tmpArray.push(tmpGrid) : yPos + s >= (tmpY + 1) * tmpS && (tmpGrid = this.grids[tmpX + 1 + '_' + (tmpY + 1)]) && tmpArray.push(tmpGrid)), tmpX && xPos - s <= tmpX * tmpS && ((tmpGrid = this.grids[tmpX - 1 + '_' + tmpY]) && tmpArray.push(tmpGrid), tmpY && yPos - s <= tmpY * tmpS ? (tmpGrid = this.grids[tmpX - 1 + '_' + (tmpY - 1)]) && tmpArray.push(tmpGrid) : yPos + s >= (tmpY + 1) * tmpS && (tmpGrid = this.grids[tmpX - 1 + '_' + (tmpY + 1)]) && tmpArray.push(tmpGrid)), yPos + s >= (tmpY + 1) * tmpS && (tmpGrid = this.grids[tmpX + '_' + (tmpY + 1)]) && tmpArray.push(tmpGrid), tmpY && yPos - s <= tmpY * tmpS && (tmpGrid = this.grids[tmpX + '_' + (tmpY - 1)]) && tmpArray.push(tmpGrid);
    } catch (e) {}
    return tmpArray;
  }, this.add = function (sid, x, y, dir, s, type, data, setSID, owner) {
    tmpObj = null;
    for (var i = 0; i < gameObjects.length; ++i)
      if (gameObjects[i].sid == sid) {
        tmpObj = gameObjects[i];
        break;
      }
    if (!tmpObj)
      for (i = 0; i < gameObjects.length; ++i)
        if (!gameObjects[i].active) {
          tmpObj = gameObjects[i];
          break;
        }
    tmpObj || (tmpObj = new GameObject(sid), gameObjects.push(tmpObj)), setSID && (tmpObj.sid = sid), tmpObj.init(x, y, dir, s, type, data, owner), server && (this.setObjectGrids(tmpObj), tmpObj.doUpdate && this.updateObjects.push(tmpObj));
  }, this.disableBySid = function (sid) {
    for (var i = 0; i < gameObjects.length; ++i)
      if (gameObjects[i].sid == sid) {
        this.disableObj(gameObjects[i]);
        break;
      }
  }, this.removeAllItems = function (sid, server) {
    for (var i = 0; i < gameObjects.length; ++i)
      gameObjects[i].active && gameObjects[i].owner && gameObjects[i].owner.sid == sid && this.disableObj(gameObjects[i]);
    server && server.broadcast('13', sid);
  }, this.fetchSpawnObj = function (sid) {
    for (var tmpLoc = null, i = 0; i < gameObjects.length; ++i)
      if ((tmpObj = gameObjects[i])
        .active && tmpObj.owner && tmpObj.owner.sid == sid && tmpObj.spawnPoint) {
        tmpLoc = [
          tmpObj.x,
          tmpObj.y
        ], this.disableObj(tmpObj), server.broadcast('12', tmpObj.sid), tmpObj.owner && tmpObj.owner.changeItemCount(tmpObj.group.id, -1);
        break;
      }
    return tmpLoc;
  }, this.checkItemLocation = function (x, y, s, sM, indx, ignoreWater, placer) {
    for (var i = 0; i < gameObjects.length; ++i) {
      var blockS = gameObjects[i].blocker ? gameObjects[i].blocker : gameObjects[i].getScale(sM, gameObjects[i].isItem);
      if (gameObjects[i].active && UTILS.getDistance(x, y, gameObjects[i].x, gameObjects[i].y) < s + blockS)
        return !1;
    }
    return !(!ignoreWater && 18 != indx && y >= config.mapScale / 2 - config.riverWidth / 2 && y <= config.mapScale / 2 + config.riverWidth / 2);
  }, this.addProjectile = function (x, y, dir, range, indx) {
    for (var tmpProj, tmpData = items.projectiles[indx], i = 0; i < projectiles.length; ++i)
      if (!projectiles[i].active) {
        tmpProj = projectiles[i];
        break;
      }
    tmpProj || (tmpProj = new Projectile(players, UTILS), projectiles.push(tmpProj)), tmpProj.init(indx, x, y, dir, tmpData.speed, range, tmpData.scale);
  }, this.checkCollision = function (player, other, delta) {
    delta = delta || 1;
    var dx = player.x - other.x,
      dy = player.y - other.y,
      tmpLen = player.scale + other.scale;
    if (mathABS(dx) <= tmpLen || mathABS(dy) <= tmpLen) {
      tmpLen = player.scale + (other.getScale ? other.getScale() : other.scale);
      var tmpInt = mathSQRT(dx * dx + dy * dy) - tmpLen;
      if (tmpInt <= 0) {
        if (other.ignoreCollision)
          !other.trap || player.noTrap || other.owner == player || other.owner && other.owner.team && other.owner.team == player.team ? other.boostSpeed ? (player.xVel += delta * other.boostSpeed * (other.weightM || 1) * mathCOS(other.dir), player.yVel += delta * other.boostSpeed * (other.weightM || 1) * mathSIN(other.dir)) : other.healCol ? player.healCol = other.healCol : other.teleport && (player.x = UTILS.randInt(0, config.mapScale), player.y = UTILS.randInt(0, config.mapScale)) : (player.lockMove = !0, other.hideFromEnemy = !1);
        else {
          var tmpDir = UTILS.getDirection(player.x, player.y, other.x, other.y);
          if (UTILS.getDistance(player.x, player.y, other.x, other.y), other.isPlayer ? (tmpInt = -1 * tmpInt / 2, player.x += tmpInt * mathCOS(tmpDir), player.y += tmpInt * mathSIN(tmpDir), other.x -= tmpInt * mathCOS(tmpDir), other.y -= tmpInt * mathSIN(tmpDir)) : (player.x = other.x + tmpLen * mathCOS(tmpDir), player.y = other.y + tmpLen * mathSIN(tmpDir), player.xVel *= 0.75, player.yVel *= 0.75), other.dmg && other.owner != player && (!other.owner || !other.owner.team || other.owner.team != player.team)) {
            player.changeHealth(-other.dmg, other.owner, other);
            var tmpSpd = 1.5 * (other.weightM || 1);
            player.xVel += tmpSpd * mathCOS(tmpDir), player.yVel += tmpSpd * mathSIN(tmpDir), !other.pDmg || player.skin && player.skin.poisonRes || (player.dmgOverTime.dmg = other.pDmg, player.dmgOverTime.time = 5, player.dmgOverTime.doer = other.owner), player.colDmg && other.health && (other.changeHealth(-player.colDmg) && this.disableObj(other), this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y)));
          }
        }
        return other.zIndex > player.zIndex && (player.zIndex = other.zIndex), !0;
      }
    }
    return !1;
  };
};

/***/ }),

/***/ "./src/js/data/player.js":
/*!*******************************!*\
  !*** ./src/js/data/player.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LangFilter = new __webpack_require__(/*! bad-words */ "./node_modules/bad-words/lib/badwords.js");
const langFilter = new LangFilter;
langFilter.addWords('jew', 'black', 'baby', 'child', 'white', 'porn', 'pedo', 'trump', 'clinton', 'hitler', 'nazi', 'gay', 'pride', 'sex', 'pleasure', 'touch', 'poo', 'kids', 'rape', 'white power', 'nigga', 'nig nog', 'doggy', 'rapist', 'boner', 'nigger', 'nigg', 'finger', 'nogger', 'nagger', 'nig', 'fag', 'gai', 'pole', 'stripper', 'penis', 'vagina', 'pussy', 'nazi', 'hitler', 'stalin', 'burn', 'chamber', 'cock', 'peen', 'dick', 'spick', 'nieger', 'die', 'satan', 'n|ig', 'nlg', 'cunt', 'c0ck', 'fag', 'lick', 'condom', 'anal', 'shit', 'phile', 'little', 'kids', 'free KR', 'tiny', 'sidney', 'ass', 'kill', '.io', '(dot)', '[dot]', 'mini', 'whiore', 'whore', 'faggot', 'github', '1337', '666', 'satan', 'senpa', 'discord', 'd1scord', 'mistik', '.io', 'senpa.io', 'sidney', 'sid', 'senpaio', 'vries', 'asa');
var mathABS = Math.abs,
  mathCOS = Math.cos,
  mathSIN = Math.sin,
  mathPOW = Math.pow,
  mathSQRT = Math.sqrt;
module.exports = function (id, sid, config, UTILS, projectileManager, objectManager, players, ais, items, hats, accessories, server, scoreCallback, iconCallback) {
  this.id = id, this.sid = sid, this.tmpScore = 0, this.team = null, this.skinIndex = 0, this.tailIndex = 0, this.hitTime = 0, this.tails = {};
  for (var i = 0; i < accessories.length; ++i)
    accessories[i].price <= 0 && (this.tails[accessories[i].id] = 1);
  for (this.skins = {}, i = 0; i < hats.length; ++i)
    hats[i].price <= 0 && (this.skins[hats[i].id] = 1);
  this.points = 0, this.dt = 0, this.hidden = !1, this.itemCounts = {}, this.isPlayer = !0, this.pps = 0, this.moveDir = void 0, this.skinRot = 0, this.lastPing = 0, this.iconIndex = 0, this.skinColor = 0, this.spawn = function (moofoll) {
    this.active = !0, this.alive = !0, this.lockMove = !1, this.lockDir = !1, this.minimapCounter = 0, this.chatCountdown = 0, this.shameCount = 0, this.shameTimer = 0, this.sentTo = {}, this.gathering = 0, this.autoGather = 0, this.animTime = 0, this.animSpeed = 0, this.mouseState = 0, this.buildIndex = -1, this.weaponIndex = 0, this.dmgOverTime = {}, this.noMovTimer = 0, this.maxXP = 300, this.XP = 0, this.age = 1, this.kills = 0, this.upgrAge = 2, this.upgradePoints = 0, this.x = 0, this.y = 0, this.zIndex = 0, this.xVel = 0, this.yVel = 0, this.slowMult = 1, this.dir = 0, this.dirPlus = 0, this.targetDir = 0, this.targetAngle = 0, this.maxHealth = 100, this.health = this.maxHealth, this.scale = config.playerScale, this.speed = config.playerSpeed, this.resetMoveDir(), this.resetResources(moofoll), this.items = [
      0,
      3,
      6,
      10
    ], this.weapons = [0], this.shootCount = 0, this.weaponXP = [], this.reloads = {};
  }, this.resetMoveDir = function () {
    this.moveDir = void 0;
  }, this.resetResources = function (moofoll) {
    for (var i = 0; i < config.resourceTypes.length; ++i)
      this[config.resourceTypes[i]] = moofoll ? 100 : 0;
  }, this.addItem = function (id) {
    var tmpItem = items.list[id];
    if (tmpItem) {
      for (var i = 0; i < this.items.length; ++i)
        if (items.list[this.items[i]].group == tmpItem.group)
          return this.buildIndex == this.items[i] && (this.buildIndex = id), this.items[i] = id, !0;
      return this.items.push(id), !0;
    }
    return !1;
  }, this.setUserData = function (data) {
    if (data) {
      this.name = 'unknown';
      var name = data.name + '',
        isProfane = !1,
        convertedName = (name = (name = (name = (name = name.slice(0, config.maxNameLength))
              .replace(/[^\w:\(\)\/? -]+/gim, ' '))
            .replace(/[^\x00-\x7F]/g, ' '))
          .trim())
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/1/g, 'i')
        .replace(/0/g, 'o')
        .replace(/5/g, 's');
      for (var word of langFilter.list)
        if (-1 != convertedName.indexOf(word)) {
          isProfane = !0;
          break;
        }
      name.length > 0 && !isProfane && (this.name = name), this.skinColor = 0, config.skinColors[data.skin] && (this.skinColor = data.skin);
    }
  }, this.getData = function () {
    return [
      this.id,
      this.sid,
      this.name,
      UTILS.fixTo(this.x, 2),
      UTILS.fixTo(this.y, 2),
      UTILS.fixTo(this.dir, 3),
      this.health,
      this.maxHealth,
      this.scale,
      this.skinColor
    ];
  }, this.setData = function (data) {
    this.id = data[0], this.sid = data[1], this.name = data[2], this.x = data[3], this.y = data[4], this.dir = data[5], this.health = data[6], this.maxHealth = data[7], this.scale = data[8], this.skinColor = data[9];
  };
  var timerCount = 0;
  this.update = function (delta) {
    if (this.alive) {
      if (this.shameTimer > 0 && (this.shameTimer -= delta, this.shameTimer <= 0 && (this.shameTimer = 0, this.shameCount = 0)), (timerCount -= delta) <= 0) {
        var regenAmount = (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) + (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
        regenAmount && this.changeHealth(regenAmount, this), this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer), this.dmgOverTime.time -= 1, this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)), this.healCol && this.changeHealth(this.healCol, this), timerCount = 1000;
      }
      if (this.alive) {
        if (this.slowMult < 1 && (this.slowMult += 0.0008 * delta, this.slowMult > 1 && (this.slowMult = 1)), this.noMovTimer += delta, (this.xVel || this.yVel) && (this.noMovTimer = 0), this.lockMove)
          this.xVel = 0, this.yVel = 0;
        else {
          var spdMult = (this.buildIndex >= 0 ? 0.5 : 1) * (items.weapons[this.weaponIndex].spdMult || 1) * (this.skin && this.skin.spdMult || 1) * (this.tail && this.tail.spdMult || 1) * (this.y <= config.snowBiomeTop ? this.skin && this.skin.coldM ? 1 : config.snowSpeed : 1) * this.slowMult;
          !this.zIndex && this.y >= config.mapScale / 2 - config.riverWidth / 2 && this.y <= config.mapScale / 2 + config.riverWidth / 2 && (this.skin && this.skin.watrImm ? (spdMult *= 0.75, this.xVel += 0.4 * config.waterCurrent * delta) : (spdMult *= 0.33, this.xVel += config.waterCurrent * delta));
          var xVel = null != this.moveDir ? mathCOS(this.moveDir) : 0,
            yVel = null != this.moveDir ? mathSIN(this.moveDir) : 0,
            length = mathSQRT(xVel * xVel + yVel * yVel);
          0 != length && (xVel /= length, yVel /= length), xVel && (this.xVel += xVel * this.speed * spdMult * delta), yVel && (this.yVel += yVel * this.speed * spdMult * delta);
        }
        var tmpList;
        this.zIndex = 0, this.lockMove = !1, this.healCol = 0;
        for (var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta), depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40))), tMlt = 1 / depth, alreadyCollided = {}, i = 0; i < depth; ++i) {
          this.xVel && (this.x += this.xVel * delta * tMlt), this.yVel && (this.y += this.yVel * delta * tMlt), tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
          for (var x = 0; x < tmpList.length; ++x) {
            for (var y = 0; y < tmpList[x].length && (!tmpList[x][y].active || alreadyCollided[tmpList[x][y].sid] || !objectManager.checkCollision(this, tmpList[x][y], tMlt) || (alreadyCollided[tmpList[x][y].sid] = !0, this.alive)); ++y);
            if (!this.alive)
              break;
          }
          if (!this.alive)
            break;
        }
        for (i = (tmpIndx = players.indexOf(this)) + 1; i < players.length; ++i)
          players[i] != this && players[i].alive && objectManager.checkCollision(this, players[i]);
        if (this.xVel && (this.xVel *= mathPOW(config.playerDecel, delta), this.xVel <= 0.01 && this.xVel >= -0.01 && (this.xVel = 0)), this.yVel && (this.yVel *= mathPOW(config.playerDecel, delta), this.yVel <= 0.01 && this.yVel >= -0.01 && (this.yVel = 0)), this.x - this.scale < 0 ? this.x = this.scale : this.x + this.scale > config.mapScale && (this.x = config.mapScale - this.scale), this.y - this.scale < 0 ? this.y = this.scale : this.y + this.scale > config.mapScale && (this.y = config.mapScale - this.scale), this.buildIndex < 0)
          if (this.reloads[this.weaponIndex] > 0)
            this.reloads[this.weaponIndex] -= delta, this.gathering = this.mouseState;
          else if (this.gathering || this.autoGather) {
          var worked = !0;
          if (null != items.weapons[this.weaponIndex].gather)
            this.gather(players);
          else if (null != items.weapons[this.weaponIndex].projectile && this.hasRes(items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0)) {
            this.useRes(items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0), this.noMovTimer = 0;
            var tmpIndx = items.weapons[this.weaponIndex].projectile,
              projOffset = 2 * this.scale,
              aMlt = this.skin && this.skin.aMlt ? this.skin.aMlt : 1;
            items.weapons[this.weaponIndex].rec && (this.xVel -= items.weapons[this.weaponIndex].rec * mathCOS(this.dir), this.yVel -= items.weapons[this.weaponIndex].rec * mathSIN(this.dir)), projectileManager.addProjectile(this.x + projOffset * mathCOS(this.dir), this.y + projOffset * mathSIN(this.dir), this.dir, items.projectiles[tmpIndx].range * aMlt, items.projectiles[tmpIndx].speed * aMlt, tmpIndx, this, null, this.zIndex);
          } else
            worked = !1;
          this.gathering = this.mouseState, worked && (this.reloads[this.weaponIndex] = items.weapons[this.weaponIndex].speed * (this.skin && this.skin.atkSpd || 1));
        }
      }
    }
  }, this.addWeaponXP = function (amnt) {
    this.weaponXP[this.weaponIndex] || (this.weaponXP[this.weaponIndex] = 0), this.weaponXP[this.weaponIndex] += amnt;
  }, this.earnXP = function (amount) {
    this.age < config.maxAge && (this.XP += amount, this.XP >= this.maxXP ? (this.age < config.maxAge ? (this.age++, this.XP = 0, this.maxXP *= 1.2) : this.XP = this.maxXP, this.upgradePoints++, server.send(this.id, '16', this.upgradePoints, this.upgrAge), server.send(this.id, '15', this.XP, UTILS.fixTo(this.maxXP, 1), this.age)) : server.send(this.id, '15', this.XP));
  }, this.changeHealth = function (amount, doer) {
    if (amount > 0 && this.health >= this.maxHealth)
      return !1;
    amount < 0 && this.skin && (amount *= this.skin.dmgMult || 1), amount < 0 && this.tail && (amount *= this.tail.dmgMult || 1), amount < 0 && (this.hitTime = Date.now()), this.health += amount, this.health > this.maxHealth && (amount -= this.health - this.maxHealth, this.health = this.maxHealth), this.health <= 0 && this.kill(doer);
    for (var i = 0; i < players.length; ++i)
      this.sentTo[players[i].id] && server.send(players[i].id, 'h', this.sid, this.health);
    return !doer || !doer.canSee(this) || doer == this && amount < 0 || server.send(doer.id, 't', Math.round(this.x), Math.round(this.y), Math.round(-amount), 1), !0;
  }, this.kill = function (doer) {
    doer && doer.alive && (doer.kills++, doer.skin && doer.skin.goldSteal ? scoreCallback(doer, Math.round(this.points / 2)) : scoreCallback(doer, Math.round(100 * this.age * (doer.skin && doer.skin.kScrM ? doer.skin.kScrM : 1))), server.send(doer.id, '9', 'kills', doer.kills, 1)), this.alive = !1, server.send(this.id, '11'), iconCallback();
  }, this.addResource = function (type, amount, auto) {
    !auto && amount > 0 && this.addWeaponXP(amount), 3 == type ? scoreCallback(this, amount, !0) : (this[config.resourceTypes[type]] += amount, server.send(this.id, '9', config.resourceTypes[type], this[config.resourceTypes[type]], 1));
  }, this.changeItemCount = function (index, value) {
    this.itemCounts[index] = this.itemCounts[index] || 0, this.itemCounts[index] += value, server.send(this.id, '14', index, this.itemCounts[index]);
  }, this.buildItem = function (item) {
    var tmpS = this.scale + item.scale + (item.placeOffset || 0),
      tmpX = this.x + tmpS * mathCOS(this.dir),
      tmpY = this.y + tmpS * mathSIN(this.dir);
    if (this.canBuild(item) && !(item.consume && this.skin && this.skin.noEat) && (item.consume || objectManager.checkItemLocation(tmpX, tmpY, item.scale, 0.6, item.id, !1, this))) {
      var worked = !1;
      if (item.consume) {
        if (this.hitTime) {
          var timeSinceHit = Date.now() - this.hitTime;
          this.hitTime = 0, timeSinceHit <= 120 ? (this.shameCount++, this.shameCount >= 8 && (this.shameTimer = 30000, this.shameCount = 0)) : (this.shameCount -= 2, this.shameCount <= 0 && (this.shameCount = 0));
        }
        this.shameTimer <= 0 && (worked = item.consume(this));
      } else
        worked = !0, item.group.limit && this.changeItemCount(item.group.id, 1), item.pps && (this.pps += item.pps), objectManager.add(objectManager.objects.length, tmpX, tmpY, this.dir, item.scale, item.type, item, !1, this);
      worked && (this.useRes(item), this.buildIndex = -1);
    }
  }, this.hasRes = function (item, mult) {
    for (var i = 0; i < item.req.length;) {
      if (this[item.req[i]] < Math.round(item.req[i + 1] * (mult || 1)))
        return !1;
      i += 2;
    }
    return !0;
  }, this.useRes = function (item, mult) {
    if (!config.inSandbox)
      for (var i = 0; i < item.req.length;)
        this.addResource(config.resourceTypes.indexOf(item.req[i]), -Math.round(item.req[i + 1] * (mult || 1))), i += 2;
  }, this.canBuild = function (item) {
    var limit = config.inSandbox ? Math.max(3 * item.group.limit, 50) : item.group.limit;
    return !(limit && this.itemCounts[item.group.id] >= limit) && (!!config.inSandbox || this.hasRes(item));
  }, this.gather = function () {
    this.noMovTimer = 0, this.slowMult -= items.weapons[this.weaponIndex].hitSlow || 0.3, this.slowMult < 0 && (this.slowMult = 0);
    for (var tmpDir, tmpObj, hitSomething, tmpVariant = config.fetchVariant(this), applyPoison = tmpVariant.poison, variantDmg = tmpVariant.val, hitObjs = {}, tmpList = objectManager.getGridArrays(this.x, this.y, items.weapons[this.weaponIndex].range), t = 0; t < tmpList.length; ++t)
      for (var i = 0; i < tmpList[t].length; ++i)
        if ((tmpObj = tmpList[t][i])
          .active && !tmpObj.dontGather && !hitObjs[tmpObj.sid] && tmpObj.visibleToPlayer(this) && UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - tmpObj.scale <= items.weapons[this.weaponIndex].range && (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle)) {
          if (hitObjs[tmpObj.sid] = 1, tmpObj.health) {
            if (tmpObj.changeHealth(-items.weapons[this.weaponIndex].dmg * variantDmg * (items.weapons[this.weaponIndex].sDmg || 1) * (this.skin && this.skin.bDmg ? this.skin.bDmg : 1), this)) {
              for (var x = 0; x < tmpObj.req.length;)
                this.addResource(config.resourceTypes.indexOf(tmpObj.req[x]), tmpObj.req[x + 1]), x += 2;
              objectManager.disableObj(tmpObj);
            }
          } else {
            this.earnXP(4 * items.weapons[this.weaponIndex].gather);
            var count = items.weapons[this.weaponIndex].gather + (3 == tmpObj.type ? 4 : 0);
            this.skin && this.skin.extraGold && this.addResource(3, 1), this.addResource(tmpObj.type, count);
          }
          hitSomething = !0, objectManager.hitObj(tmpObj, tmpDir);
        }
    for (i = 0; i < players.length + ais.length; ++i)
      if ((tmpObj = players[i] || ais[i - players.length]) != this && tmpObj.alive && (!tmpObj.team || tmpObj.team != this.team) && UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - 1.8 * tmpObj.scale <= items.weapons[this.weaponIndex].range && (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle)) {
        var stealCount = items.weapons[this.weaponIndex].steal;
        stealCount && tmpObj.addResource && (stealCount = Math.min(tmpObj.points || 0, stealCount), this.addResource(3, stealCount), tmpObj.addResource(3, -stealCount));
        var dmgMlt = variantDmg;
        null != tmpObj.weaponIndex && items.weapons[tmpObj.weaponIndex].shield && UTILS.getAngleDist(tmpDir + Math.PI, tmpObj.dir) <= config.shieldAngle && (dmgMlt = items.weapons[tmpObj.weaponIndex].shield);
        var baseDmgVal = items.weapons[this.weaponIndex].dmg,
          dmgVal = baseDmgVal * (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) * (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1),
          tmpSpd = 0.3 * (tmpObj.weightM || 1) + (items.weapons[this.weaponIndex].knock || 0);
        tmpObj.xVel += tmpSpd * mathCOS(tmpDir), tmpObj.yVel += tmpSpd * mathSIN(tmpDir), this.skin && this.skin.healD && this.changeHealth(dmgVal * dmgMlt * this.skin.healD, this), this.tail && this.tail.healD && this.changeHealth(dmgVal * dmgMlt * this.tail.healD, this), tmpObj.skin && tmpObj.skin.dmg && this.changeHealth(-baseDmgVal * tmpObj.skin.dmg, tmpObj), tmpObj.tail && tmpObj.tail.dmg && this.changeHealth(-baseDmgVal * tmpObj.tail.dmg, tmpObj), !(tmpObj.dmgOverTime && this.skin && this.skin.poisonDmg) || tmpObj.skin && tmpObj.skin.poisonRes || (tmpObj.dmgOverTime.dmg = this.skin.poisonDmg, tmpObj.dmgOverTime.time = this.skin.poisonTime || 1, tmpObj.dmgOverTime.doer = this), !tmpObj.dmgOverTime || !applyPoison || tmpObj.skin && tmpObj.skin.poisonRes || (tmpObj.dmgOverTime.dmg = 5, tmpObj.dmgOverTime.time = 5, tmpObj.dmgOverTime.doer = this), tmpObj.skin && tmpObj.skin.dmgK && (this.xVel -= tmpObj.skin.dmgK * mathCOS(tmpDir), this.yVel -= tmpObj.skin.dmgK * mathSIN(tmpDir)), tmpObj.changeHealth(-dmgVal * dmgMlt, this, this);
      }
    this.sendAnimation(hitSomething ? 1 : 0);
  }, this.sendAnimation = function (hit) {
    for (var i = 0; i < players.length; ++i)
      this.sentTo[players[i].id] && this.canSee(players[i]) && server.send(players[i].id, '7', this.sid, hit ? 1 : 0, this.weaponIndex);
  };
  var tmpRatio = 0,
    animIndex = 0;
  this.animate = function (delta) {
    this.animTime > 0 && (this.animTime -= delta, this.animTime <= 0 ? (this.animTime = 0, this.dirPlus = 0, tmpRatio = 0, animIndex = 0) : 0 == animIndex ? (tmpRatio += delta / (this.animSpeed * config.hitReturnRatio), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio)), tmpRatio >= 1 && (tmpRatio = 1, animIndex = 1)) : (tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio)), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio))));
  }, this.startAnim = function (didHit, index) {
    this.animTime = this.animSpeed = items.weapons[index].speed, this.targetAngle = didHit ? -config.hitAngle : -Math.PI, tmpRatio = 0, animIndex = 0;
  }, this.canSee = function (other) {
    if (!other)
      return !1;
    if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer)
      return !1;
    var dx = mathABS(other.x - this.x) - other.scale,
      dy = mathABS(other.y - this.y) - other.scale;
    return dx <= config.maxScreenWidth / 2 * 1.3 && dy <= config.maxScreenHeight / 2 * 1.3;
  };
};

/***/ }),

/***/ "./src/js/data/projectile.js":
/*!***********************************!*\
  !*** ./src/js/data/projectile.js ***!
  \***********************************/
/***/ ((module) => {

module.exports = function (players, ais, objectManager, items, config, UTILS, server) {
  this.init = function (indx, x, y, dir, spd, dmg, rng, scl, owner) {
    this.active = !0, this.indx = indx, this.x = x, this.y = y, this.dir = dir, this.skipMov = !0, this.speed = spd, this.dmg = dmg, this.scale = scl, this.range = rng, this.owner = owner, server && (this.sentTo = {});
  };
  var tmpObj, objectsHit = [];
  this.update = function (delta) {
    if (this.active) {
      var tmpScale, tmpSpeed = this.speed * delta;
      if (this.skipMov ? this.skipMov = !1 : (this.x += tmpSpeed * Math.cos(this.dir), this.y += tmpSpeed * Math.sin(this.dir), this.range -= tmpSpeed, this.range <= 0 && (this.x += this.range * Math.cos(this.dir), this.y += this.range * Math.sin(this.dir), tmpSpeed = 1, this.range = 0, this.active = !1)), server) {
        for (var i = 0; i < players.length; ++i)
          !this.sentTo[players[i].id] && players[i].canSee(this) && (this.sentTo[players[i].id] = 1, server.send(players[i].id, '18', UTILS.fixTo(this.x, 1), UTILS.fixTo(this.y, 1), UTILS.fixTo(this.dir, 2), UTILS.fixTo(this.range, 1), this.speed, this.indx, this.layer, this.sid));
        for (objectsHit.length = 0, i = 0; i < players.length + ais.length; ++i)
          !(tmpObj = players[i] || ais[i - players.length])
          .alive || tmpObj == this.owner || this.owner.team && tmpObj.team == this.owner.team || UTILS.lineInRect(tmpObj.x - tmpObj.scale, tmpObj.y - tmpObj.scale, tmpObj.x + tmpObj.scale, tmpObj.y + tmpObj.scale, this.x, this.y, this.x + tmpSpeed * Math.cos(this.dir), this.y + tmpSpeed * Math.sin(this.dir)) && objectsHit.push(tmpObj);
        for (var tmpList = objectManager.getGridArrays(this.x, this.y, this.scale), x = 0; x < tmpList.length; ++x)
          for (var y = 0; y < tmpList[x].length; ++y)
            tmpScale = (tmpObj = tmpList[x][y])
            .getScale(), tmpObj.active && this.ignoreObj != tmpObj.sid && this.layer <= tmpObj.layer && objectsHit.indexOf(tmpObj) < 0 && !tmpObj.ignoreCollision && UTILS.lineInRect(tmpObj.x - tmpScale, tmpObj.y - tmpScale, tmpObj.x + tmpScale, tmpObj.y + tmpScale, this.x, this.y, this.x + tmpSpeed * Math.cos(this.dir), this.y + tmpSpeed * Math.sin(this.dir)) && objectsHit.push(tmpObj);
        if (objectsHit.length > 0) {
          var hitObj = null,
            shortDist = null,
            tmpDist = null;
          for (i = 0; i < objectsHit.length; ++i)
            tmpDist = UTILS.getDistance(this.x, this.y, objectsHit[i].x, objectsHit[i].y), (null == shortDist || tmpDist < shortDist) && (shortDist = tmpDist, hitObj = objectsHit[i]);
          if (hitObj.isPlayer || hitObj.isAI) {
            var tmpSd = 0.3 * (hitObj.weightM || 1);
            hitObj.xVel += tmpSd * Math.cos(this.dir), hitObj.yVel += tmpSd * Math.sin(this.dir), null != hitObj.weaponIndex && items.weapons[hitObj.weaponIndex].shield && UTILS.getAngleDist(this.dir + Math.PI, hitObj.dir) <= config.shieldAngle || hitObj.changeHealth(-this.dmg, this.owner, this.owner);
          } else
            for (hitObj.projDmg && hitObj.health && hitObj.changeHealth(-this.dmg) && objectManager.disableObj(hitObj), i = 0; i < players.length; ++i)
              players[i].active && (hitObj.sentTo[players[i].id] && (hitObj.active ? players[i].canSee(hitObj) && server.send(players[i].id, '8', UTILS.fixTo(this.dir, 2), hitObj.sid) : server.send(players[i].id, '12', hitObj.sid)), hitObj.active || hitObj.owner != players[i] || players[i].changeItemCount(hitObj.group.id, -1));
          for (this.active = !1, i = 0; i < players.length; ++i)
            this.sentTo[players[i].id] && server.send(players[i].id, '19', this.sid, UTILS.fixTo(shortDist, 1));
        }
      }
    }
  };
};

/***/ }),

/***/ "./src/js/data/projectileManager.js":
/*!******************************************!*\
  !*** ./src/js/data/projectileManager.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = function (Projectile, projectiles, players, ais, objectManager, items, config, UTILS, server) {
  this.addProjectile = function (x, y, dir, range, speed, indx, owner, ignoreObj, layer) {
    for (var tmpProj, tmpData = items.projectiles[indx], i = 0; i < projectiles.length; ++i)
      if (!projectiles[i].active) {
        tmpProj = projectiles[i];
        break;
      }
    return tmpProj || ((tmpProj = new Projectile(players, ais, objectManager, items, config, UTILS, server))
      .sid = projectiles.length, projectiles.push(tmpProj)), tmpProj.init(indx, x, y, dir, speed, tmpData.dmg, range, tmpData.scale, owner), tmpProj.ignoreObj = ignoreObj, tmpProj.layer = layer || tmpData.layer, tmpProj.src = tmpData.src, tmpProj;
  };
};

/***/ }),

/***/ "./src/js/data/store.js":
/*!******************************!*\
  !*** ./src/js/data/store.js ***!
  \******************************/
/***/ ((module) => {

module.exports.hats = [{
    id: 45,
    name: 'Shame!',
    dontSell: !0,
    price: 0,
    scale: 120,
    desc: 'hacks are for losers'
  },
  {
    id: 51,
    name: 'Moo Cap',
    price: 0,
    scale: 120,
    desc: 'coolest mooer around'
  },
  {
    id: 50,
    name: 'Apple Cap',
    price: 0,
    scale: 120,
    desc: 'apple farms remembers'
  },
  {
    id: 28,
    name: 'Moo Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 29,
    name: 'Pig Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 30,
    name: 'Fluff Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 36,
    name: 'Pandou Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 37,
    name: 'Bear Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 38,
    name: 'Monkey Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 44,
    name: 'Polar Head',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 35,
    name: 'Fez Hat',
    price: 0,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 42,
    name: 'Enigma Hat',
    price: 0,
    scale: 120,
    desc: 'join the enigma army'
  },
  {
    id: 43,
    name: 'Blitz Hat',
    price: 0,
    scale: 120,
    desc: 'hey everybody i\'m blitz'
  },
  {
    id: 49,
    name: 'Bob XIII Hat',
    price: 0,
    scale: 120,
    desc: 'like and subscribe'
  },
  {
    id: 57,
    name: 'Pumpkin',
    price: 50,
    scale: 120,
    desc: 'Spooooky'
  },
  {
    id: 8,
    name: 'Bummle Hat',
    price: 100,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 2,
    name: 'Straw Hat',
    price: 500,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 15,
    name: 'Winter Cap',
    price: 600,
    scale: 120,
    desc: 'allows you to move at normal speed in snow',
    coldM: 1
  },
  {
    id: 5,
    name: 'Cowboy Hat',
    price: 1000,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 4,
    name: 'Ranger Hat',
    price: 2000,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 18,
    name: 'Explorer Hat',
    price: 2000,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 31,
    name: 'Flipper Hat',
    price: 2500,
    scale: 120,
    desc: 'have more control while in water',
    watrImm: !0
  },
  {
    id: 1,
    name: 'Marksman Cap',
    price: 3000,
    scale: 120,
    desc: 'increases arrow speed and range',
    aMlt: 1.3
  },
  {
    id: 10,
    name: 'Bush Gear',
    price: 3000,
    scale: 160,
    desc: 'allows you to disguise yourself as a bush'
  },
  {
    id: 48,
    name: 'Halo',
    price: 3000,
    scale: 120,
    desc: 'no effect'
  },
  {
    id: 6,
    name: 'Soldier Helmet',
    price: 4000,
    scale: 120,
    desc: 'reduces damage taken but slows movement',
    spdMult: 0.94,
    dmgMult: 0.75
  },
  {
    id: 23,
    name: 'Anti Venom Gear',
    price: 4000,
    scale: 120,
    desc: 'makes you immune to poison',
    poisonRes: 1
  },
  {
    id: 13,
    name: 'Medic Gear',
    price: 5000,
    scale: 110,
    desc: 'slowly regenerates health over time',
    healthRegen: 3
  },
  {
    id: 9,
    name: 'Miners Helmet',
    price: 5000,
    scale: 120,
    desc: 'earn 1 extra gold per resource',
    extraGold: 1
  },
  {
    id: 32,
    name: 'Musketeer Hat',
    price: 5000,
    scale: 120,
    desc: 'reduces cost of projectiles',
    projCost: 0.5
  },
  {
    id: 7,
    name: 'Bull Helmet',
    price: 6000,
    scale: 120,
    desc: 'increases damage done but drains health',
    healthRegen: -5,
    dmgMultO: 1.5,
    spdMult: 0.96
  },
  {
    id: 22,
    name: 'Emp Helmet',
    price: 6000,
    scale: 120,
    desc: 'turrets won\'t attack but you move slower',
    antiTurret: 1,
    spdMult: 0.7
  },
  {
    id: 12,
    name: 'Booster Hat',
    price: 6000,
    scale: 120,
    desc: 'increases your movement speed',
    spdMult: 1.16
  },
  {
    id: 26,
    name: 'Barbarian Armor',
    price: 8000,
    scale: 120,
    desc: 'knocks back enemies that attack you',
    dmgK: 0.6
  },
  {
    id: 21,
    name: 'Plague Mask',
    price: 10000,
    scale: 120,
    desc: 'melee attacks deal poison damage',
    poisonDmg: 5,
    poisonTime: 6
  },
  {
    id: 46,
    name: 'Bull Mask',
    price: 10000,
    scale: 120,
    desc: 'bulls won\'t target you unless you attack them',
    bullRepel: 1
  },
  {
    id: 14,
    name: 'Windmill Hat',
    topSprite: !0,
    price: 10000,
    scale: 120,
    desc: 'generates points while worn',
    pps: 1.5
  },
  {
    id: 11,
    name: 'Spike Gear',
    topSprite: !0,
    price: 10000,
    scale: 120,
    desc: 'deal damage to players that damage you',
    dmg: 0.45
  },
  {
    id: 53,
    name: 'Turret Gear',
    topSprite: !0,
    price: 10000,
    scale: 120,
    desc: 'you become a walking turret',
    turret: {
      proj: 1,
      range: 700,
      rate: 2500
    },
    spdMult: 0.7
  },
  {
    id: 20,
    name: 'Samurai Armor',
    price: 12000,
    scale: 120,
    desc: 'increased attack speed and fire rate',
    atkSpd: 0.78
  },
  {
    id: 58,
    name: 'Dark Knight',
    price: 12000,
    scale: 120,
    desc: 'restores health when you deal damage',
    healD: 0.4
  },
  {
    id: 27,
    name: 'Scavenger Gear',
    price: 15000,
    scale: 120,
    desc: 'earn double points for each kill',
    kScrM: 2
  },
  {
    id: 40,
    name: 'Tank Gear',
    price: 15000,
    scale: 120,
    desc: 'increased damage to buildings but slower movement',
    spdMult: 0.3,
    bDmg: 3.3
  },
  {
    id: 52,
    name: 'Thief Gear',
    price: 15000,
    scale: 120,
    desc: 'steal half of a players gold when you kill them',
    goldSteal: 0.5
  },
  {
    id: 55,
    name: 'Bloodthirster',
    price: 20000,
    scale: 120,
    desc: 'Restore Health when dealing damage. And increased damage',
    healD: 0.25,
    dmgMultO: 1.2
  },
  {
    id: 56,
    name: 'Assassin Gear',
    price: 20000,
    scale: 120,
    desc: 'Go invisible when not moving. Can\'t eat. Increased speed',
    noEat: !0,
    spdMult: 1.1,
    invisTimer: 1000
  }
], module.exports.accessories = [{
    id: 12,
    name: 'Snowball',
    price: 1000,
    scale: 105,
    xOff: 18,
    desc: 'no effect'
  },
  {
    id: 9,
    name: 'Tree Cape',
    price: 1000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 10,
    name: 'Stone Cape',
    price: 1000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 3,
    name: 'Cookie Cape',
    price: 1500,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 8,
    name: 'Cow Cape',
    price: 2000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 11,
    name: 'Monkey Tail',
    price: 2000,
    scale: 97,
    xOff: 25,
    desc: 'Super speed but reduced damage',
    spdMult: 1.35,
    dmgMultO: 0.2
  },
  {
    id: 17,
    name: 'Apple Basket',
    price: 3000,
    scale: 80,
    xOff: 12,
    desc: 'slowly regenerates health over time',
    healthRegen: 1
  },
  {
    id: 6,
    name: 'Winter Cape',
    price: 3000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 4,
    name: 'Skull Cape',
    price: 4000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 5,
    name: 'Dash Cape',
    price: 5000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 2,
    name: 'Dragon Cape',
    price: 6000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 1,
    name: 'Super Cape',
    price: 8000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 7,
    name: 'Troll Cape',
    price: 8000,
    scale: 90,
    desc: 'no effect'
  },
  {
    id: 14,
    name: 'Thorns',
    price: 10000,
    scale: 115,
    xOff: 20,
    desc: 'no effect'
  },
  {
    id: 15,
    name: 'Blockades',
    price: 10000,
    scale: 95,
    xOff: 15,
    desc: 'no effect'
  },
  {
    id: 20,
    name: 'Devils Tail',
    price: 10000,
    scale: 95,
    xOff: 20,
    desc: 'no effect'
  },
  {
    id: 16,
    name: 'Sawblade',
    price: 12000,
    scale: 90,
    spin: !0,
    xOff: 0,
    desc: 'deal damage to players that damage you',
    dmg: 0.15
  },
  {
    id: 13,
    name: 'Angel Wings',
    price: 15000,
    scale: 138,
    xOff: 22,
    desc: 'slowly regenerates health over time',
    healthRegen: 3
  },
  {
    id: 19,
    name: 'Shadow Wings',
    price: 15000,
    scale: 138,
    xOff: 22,
    desc: 'increased movement speed',
    spdMult: 1.1
  },
  {
    id: 18,
    name: 'Blood Wings',
    price: 20000,
    scale: 178,
    xOff: 26,
    desc: 'restores health when you deal damage',
    healD: 0.2
  },
  {
    id: 21,
    name: 'Corrupt X Wings',
    price: 20000,
    scale: 178,
    xOff: 26,
    desc: 'deal damage to players that damage you',
    dmg: 0.25
  }
];

/***/ }),

/***/ "./src/libs/animText.js":
/*!******************************!*\
  !*** ./src/libs/animText.js ***!
  \******************************/
/***/ ((module) => {

module.exports.AnimText = function () {
  this.init = function (x, y, scale, speed, life, text, color) {
    this.x = x, this.y = y, this.color = color, this.scale = scale, this.startScale = this.scale, this.maxScale = 1.5 * scale, this.scaleSpeed = 0.7, this.speed = speed, this.life = life, this.text = text;
  }, this.update = function (delta) {
    this.life && (this.life -= delta, this.y -= this.speed * delta, this.scale += this.scaleSpeed * delta, this.scale >= this.maxScale ? (this.scale = this.maxScale, this.scaleSpeed *= -1) : this.scale <= this.startScale && (this.scale = this.startScale, this.scaleSpeed = 0), this.life <= 0 && (this.life = 0));
  }, this.render = function (ctxt, xOff, yOff) {
    ctxt.fillStyle = this.color, ctxt.font = this.scale + 'px Hammersmith One', ctxt.fillText(this.text, this.x - xOff, this.y - yOff);
  };
}, module.exports.TextManager = function () {
  this.texts = [], this.update = function (delta, ctxt, xOff, yOff) {
    ctxt.textBaseline = 'middle', ctxt.textAlign = 'center';
    for (var i = 0; i < this.texts.length; ++i)
      this.texts[i].life && (this.texts[i].update(delta), this.texts[i].render(ctxt, xOff, yOff));
  }, this.showText = function (x, y, scale, speed, life, text, color) {
    for (var tmpText, i = 0; i < this.texts.length; ++i)
      if (!this.texts[i].life) {
        tmpText = this.texts[i];
        break;
      }
    tmpText || (tmpText = new module.exports.AnimText(), this.texts.push(tmpText)), tmpText.init(x, y, scale, speed, life, text, color);
  };
};

/***/ }),

/***/ "./src/libs/io-client.js":
/*!*******************************!*\
  !*** ./src/libs/io-client.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


__webpack_require__(/*! ../config.js */ "./src/config.js"), module.exports = {
  socket: null,
  connected: !1,
  socketId: -1,
  connect: function (address, callback, events) {
    if (!this.socket) {
      var _this = this;
      try {
        var socketError = !1,
          socketAddress = address;
        this.socket = new WebSocket(socketAddress), this.socket.binaryType = 'arraybuffer', this.socket.onmessage = function (message) {
          var data = new Uint8Array(message.data),
            parsed = msgpack.decode(data),
            type = parsed[0];
          data = parsed[1], 'io-init' == type ? _this.socketId = data[0] : events[type].apply(void 0, data);
        }, this.socket.onopen = function () {
          _this.connected = !0, callback();
        }, this.socket.onclose = function (event) {
          _this.connected = !1, 4001 == event.code ? callback('Invalid Connection') : socketError || callback('disconnected');
        }, this.socket.onerror = function (error) {
          this.socket && this.socket.readyState != WebSocket.OPEN && (socketError = !0, console.error('Socket error', arguments), callback('Socket error'));
        };
      } catch (e) {
        console.warn('Socket connection error:', e), callback(e);
      }
    }
  },
  send: function (type) {
    var data = Array.prototype.slice.call(arguments, 1),
      binary = msgpack.encode([
        type,
        data
      ]);
    this.socket.send(binary);
  },
  socketReady: function () {
    return this.socket && this.connected;
  },
  close: function () {
    this.socket && this.socket.close();
  }
};

/***/ }),

/***/ "./src/libs/modernizr.js":
/*!*******************************!*\
  !*** ./src/libs/modernizr.js ***!
  \*******************************/
/***/ (() => {

! function (e, n, s) {
  function o(e, n) {
    return typeof e === n;
  }
  var i = [],
    r = [],
    f = {
      _version: '3.5.0',
      _config: {
        classPrefix: '',
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function (e, n) {
        var s = this;
        setTimeout(function () {
          n(s[e]);
        }, 0);
      },
      addTest: function (e, n, s) {
        r.push({
          name: e,
          fn: n,
          options: s
        });
      },
      addAsyncTest: function (e) {
        r.push({
          name: null,
          fn: e
        });
      }
    },
    Modernizr = function () {};
  Modernizr.prototype = f, Modernizr = new Modernizr();
  var l = n.documentElement,
    c = 'svg' === l.nodeName.toLowerCase();
  Modernizr.addTest('passiveeventlisteners', function () {
      var n = !1;
      try {
        var s = Object.defineProperty({}, 'passive', {
          get: function () {
            n = !0;
          }
        });
        e.addEventListener('test', null, s);
      } catch (e) {}
      return n;
    }),
    function () {
      var e, n, s, a, t, l;
      for (var c in r)
        if (r.hasOwnProperty(c)) {
          if (e = [], (n = r[c])
            .name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
            for (s = 0; s < n.options.aliases.length; s++)
              e.push(n.options.aliases[s].toLowerCase());
          for (a = o(n.fn, 'function') ? n.fn() : n.fn, t = 0; t < e.length; t++)
            1 === (l = e[t].split('.'))
            .length ? Modernizr[l[0]] = a : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = a), i.push((a ? '' : 'no-') + l.join('-'));
        }
    }(),
    function (e) {
      var n = l.className,
        s = Modernizr._config.classPrefix || '';
      if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
        var o = new RegExp('(^|\\s)' + s + 'no-js(\\s|$)');
        n = n.replace(o, '$1' + s + 'js$2');
      }
      Modernizr._config.enableClasses && (n += ' ' + s + e.join(' ' + s), c ? l.className.baseVal = n : l.className = n);
    }(i), delete f.addTest, delete f.addAsyncTest;
  for (var u = 0; u < Modernizr._q.length; u++)
    Modernizr._q[u]();
  e.Modernizr = Modernizr;
}(window, document);

/***/ }),

/***/ "./src/libs/msgpack.js":
/*!*****************************!*\
  !*** ./src/libs/msgpack.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/** idk who made this **/
// https://update.greasyfork.org/scripts/423602/1005014/msgpack.js

(function() {
    'use strict';
 
    function serialize(data) {
        const pow32 = 0x100000000;
        let floatBuffer, floatView;
        let array = new Uint8Array(128);
        let length = 0;
        append(data);
        return array.subarray(0, length);
 
        function append(data) {
            switch (typeof data) {
                case "undefined":
                    appendNull(data);
                    break;
                case "boolean":
                    appendBoolean(data);
                    break;
                case "number":
                    appendNumber(data);
                    break;
                case "string":
                    appendString(data);
                    break;
                case "object":
                    if (data === null) {
                        appendNull(data);
                    } else if (data instanceof Date) {
                        appendDate(data);
                    } else if (Array.isArray(data)) {
                        appendArray(data);
                    } else if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
                        appendBinArray(data);
                    } else if (data instanceof Int8Array || data instanceof Int16Array || data instanceof Uint16Array ||
                               data instanceof Int32Array || data instanceof Uint32Array ||
                               data instanceof Float32Array || data instanceof Float64Array) {
                        appendArray(data);
                    } else {
                        appendObject(data);
                    }
                    break;
            }
        }
 
        function appendNull(data) {
            appendByte(0xc0);
        }
 
        function appendBoolean(data) {
            appendByte(data ? 0xc3 : 0xc2);
        }
 
        function appendNumber(data) {
            if (isFinite(data) && Math.floor(data) === data) {
                if (data >= 0 && data <= 0x7f) {
                    appendByte(data);
                } else if (data < 0 && data >= -0x20) {
                    appendByte(data);
                } else if (data > 0 && data <= 0xff) { // uint8
                    appendBytes([0xcc, data]);
                } else if (data >= -0x80 && data <= 0x7f) { // int8
                    appendBytes([0xd0, data]);
                } else if (data > 0 && data <= 0xffff) { // uint16
                    appendBytes([0xcd, data >>> 8, data]);
                } else if (data >= -0x8000 && data <= 0x7fff) { // int16
                    appendBytes([0xd1, data >>> 8, data]);
                } else if (data > 0 && data <= 0xffffffff) { // uint32
                    appendBytes([0xce, data >>> 24, data >>> 16, data >>> 8, data]);
                } else if (data >= -0x80000000 && data <= 0x7fffffff) { // int32
                    appendBytes([0xd2, data >>> 24, data >>> 16, data >>> 8, data]);
                } else if (data > 0 && data <= 0xffffffffffffffff) { // uint64
                    let hi = data / pow32;
                    let lo = data % pow32;
                    appendBytes([0xd3, hi >>> 24, hi >>> 16, hi >>> 8, hi, lo >>> 24, lo >>> 16, lo >>> 8, lo]);
                } else if (data >= -0x8000000000000000 && data <= 0x7fffffffffffffff) { // int64
                    appendByte(0xd3);
                    appendInt64(data);
                } else if (data < 0) { // below int64
                    appendBytes([0xd3, 0x80, 0, 0, 0, 0, 0, 0, 0]);
                } else { // above uint64
                    appendBytes([0xcf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
                }
            } else {
                if (!floatView) {
                    floatBuffer = new ArrayBuffer(8);
                    floatView = new DataView(floatBuffer);
                }
                floatView.setFloat64(0, data);
                appendByte(0xcb);
                appendBytes(new Uint8Array(floatBuffer));
            }
        }
 
        function appendString(data) {
            let bytes = encodeUtf8(data);
            let length = bytes.length;
 
            if (length <= 0x1f) {
                appendByte(0xa0 + length);
            } else if (length <= 0xff) {
                appendBytes([0xd9, length]);
            } else if (length <= 0xffff) {
                appendBytes([0xda, length >>> 8, length]);
            } else {
                appendBytes([0xdb, length >>> 24, length >>> 16, length >>> 8, length]);
            }
 
            appendBytes(bytes);
        }
 
        function appendArray(data) {
            let length = data.length;
 
            if (length <= 0xf) {
                appendByte(0x90 + length);
            } else if (length <= 0xffff) {
                appendBytes([0xdc, length >>> 8, length]);
            } else {
                appendBytes([0xdd, length >>> 24, length >>> 16, length >>> 8, length]);
            }
 
            for (let index = 0; index < length; index++) {
                append(data[index]);
            }
        }
 
        function appendBinArray(data) {
            let length = data.length;
 
            if (length <= 0xf) {
                appendBytes([0xc4, length]);
            } else if (length <= 0xffff) {
                appendBytes([0xc5, length >>> 8, length]);
            } else {
                appendBytes([0xc6, length >>> 24, length >>> 16, length >>> 8, length]);
            }
 
            appendBytes(data);
        }
 
        function appendObject(data) {
            let length = 0;
            for (let key in data) length++;
 
            if (length <= 0xf) {
                appendByte(0x80 + length);
            } else if (length <= 0xffff) {
                appendBytes([0xde, length >>> 8, length]);
            } else {
                appendBytes([0xdf, length >>> 24, length >>> 16, length >>> 8, length]);
            }
 
            for (let key in data) {
                append(key);
                append(data[key]);
            }
        }
 
        function appendDate(data) {
            let sec = data.getTime() / 1000;
            if (data.getMilliseconds() === 0 && sec >= 0 && sec < 0x100000000) { // 32 bit seconds
                appendBytes([0xd6, 0xff, sec >>> 24, sec >>> 16, sec >>> 8, sec]);
            }
            else if (sec >= 0 && sec < 0x400000000) { // 30 bit nanoseconds, 34 bit seconds
                let ns = data.getMilliseconds() * 1000000;
                appendBytes([0xd7, 0xff, ns >>> 22, ns >>> 14, ns >>> 6, ((ns << 2) >>> 0) | (sec / pow32), sec >>> 24, sec >>> 16, sec >>> 8, sec]);
            }
            else { // 32 bit nanoseconds, 64 bit seconds, negative values allowed
                let ns = data.getMilliseconds() * 1000000;
                appendBytes([0xc7, 12, 0xff, ns >>> 24, ns >>> 16, ns >>> 8, ns]);
                appendInt64(sec);
            }
        }
 
        function appendByte(byte) {
            if (array.length < length + 1) {
                let newLength = array.length * 2;
                while (newLength < length + 1)
                    newLength *= 2;
                let newArray = new Uint8Array(newLength);
                newArray.set(array);
                array = newArray;
            }
            array[length] = byte;
            length++;
        }
 
        function appendBytes(bytes) {
            if (array.length < length + bytes.length) {
                let newLength = array.length * 2;
                while (newLength < length + bytes.length)
                    newLength *= 2;
                let newArray = new Uint8Array(newLength);
                newArray.set(array);
                array = newArray;
            }
            array.set(bytes, length);
            length += bytes.length;
        }
 
        function appendInt64(value) {
            let hi, lo;
            if (value >= 0) {
                hi = value / pow32;
                lo = value % pow32;
            }
            else {
                value++;
                hi = Math.abs(value) / pow32;
                lo = Math.abs(value) % pow32;
                hi = ~hi;
                lo = ~lo;
            }
            appendBytes([hi >>> 24, hi >>> 16, hi >>> 8, hi, lo >>> 24, lo >>> 16, lo >>> 8, lo]);
        }
    }
 
    function deserialize(array) {
        const pow32 = 0x100000000; // 2^32
        let pos = 0;
        if (array instanceof ArrayBuffer) {
            array = new Uint8Array(array);
        }
        if (typeof array !== "object" || typeof array.length === "undefined") {
            throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        }
        if (!array.length) {
            throw new Error("Invalid argument: The byte array to deserialize is empty.");
        }
        if (!(array instanceof Uint8Array)) {
            array = new Uint8Array(array);
        }
        let data = read();
        if (pos < array.length) {
        }
        return data;
 
        function read() {
            const byte = array[pos++];
            if (byte >= 0x00 && byte <= 0x7f) return byte; // positive fixint
            if (byte >= 0x80 && byte <= 0x8f) return readMap(byte - 0x80); // fixmap
            if (byte >= 0x90 && byte <= 0x9f) return readArray(byte - 0x90); // fixarray
            if (byte >= 0xa0 && byte <= 0xbf) return readStr(byte - 0xa0); // fixstr
            if (byte === 0xc0) return null; // nil
            if (byte === 0xc1) throw new Error("Invalid byte code 0xc1 found."); // never used
            if (byte === 0xc2) return false // false
            if (byte === 0xc3) return true; // true
            if (byte === 0xc4) return readBin(-1, 1); // bin 8
            if (byte === 0xc5) return readBin(-1, 2); // bin 16
            if (byte === 0xc6) return readBin(-1, 4); // bin 32
            if (byte === 0xc7) return readExt(-1, 1); // ext 8
            if (byte === 0xc8) return readExt(-1, 2); // ext 16
            if (byte === 0xc9) return readExt(-1, 4) // ext 32
            if (byte === 0xca) return readFloat(4); // float 32
            if (byte === 0xcb) return readFloat(8); // float 64
            if (byte === 0xcc) return readUInt(1); // uint 8
            if (byte === 0xcd) return readUInt(2); // uint 16
            if (byte === 0xce) return readUInt(4); // uint 32
            if (byte === 0xcf) return readUInt(8) // uint 64
            if (byte === 0xd0) return readInt(1); // int 8
            if (byte === 0xd1) return readInt(2); // int 16
            if (byte === 0xd2) return readInt(4); // int 32
            if (byte === 0xd3) return readInt(8); // int 64
            if (byte === 0xd4) return readExt(1); // fixext 1
            if (byte === 0xd5) return readExt(2); // fixext 2
            if (byte === 0xd6) return readExt(4); // fixext 4
            if (byte === 0xd7) return readExt(8); // fixext 8
            if (byte === 0xd8) return readExt(16); // fixext 16
            if (byte === 0xd9) return readStr(-1, 1); // str 8
            if (byte === 0xda) return readStr(-1, 2); // str 16
            if (byte === 0xdb) return readStr(-1, 4); // str 32
            if (byte === 0xdc) return readArray(-1, 2); // array 16
            if (byte === 0xdd) return readArray(-1, 4); // array 32
            if (byte === 0xde) return readMap(-1, 2); // map 16
            if (byte === 0xdf) return readMap(-1, 4); // map 32
            if (byte >= 0xe0 && byte <= 0xff) return byte - 256; // negative fixint
            console.debug("msgpack array:", array);
            throw new Error("Invalid byte value '" + byte + "' at index " + (pos - 1) + " in the MessagePack binary data (length " + array.length + "): Expecting a range of 0 to 255. This is not a byte array.");
        }
 
        function readInt(size) {
            let value = 0;
            let first = true;
            while (size-- > 0) {
                if (first) {
                    let byte = array[pos++];
                    value += byte & 0x7f;
                    if (byte & 0x80) {
                        value -= 0x80;
                    }
                    first = false;
                }
                else {
                    value *= 256;
                    value += array[pos++];
                }
            }
            return value;
        }
 
        function readUInt(size) {
            let value = 0;
            while (size-- > 0) {
                value *= 256;
                value += array[pos++];
            }
            return value;
        }
 
        function readFloat(size) {
            let view = new DataView(array.buffer, pos, size);
            pos += size;
            if (size === 4) {
                return view.getFloat32(0, false);
            }
            if (size === 8) {
                return view.getFloat64(0, false);
            }
        }
 
        function readBin(size, lengthSize) {
            if (size < 0) size = readUInt(lengthSize);
            let data = array.subarray(pos, pos + size);
            pos += size;
            return data;
        }
 
        function readMap(size, lengthSize) {
            if (size < 0) size = readUInt(lengthSize);
            let data = {};
            while (size-- > 0) {
                let key = read();
                data[key] = read();
            }
            return data;
        }
 
        function readArray(size, lengthSize) {
            if (size < 0) size = readUInt(lengthSize);
            let data = [];
            while (size-- > 0) {
                data.push(read());
            }
            return data;
        }
 
        function readStr(size, lengthSize) {
            if (size < 0) size = readUInt(lengthSize);
            let start = pos;
            pos += size;
            return decodeUtf8(array, start, size);
        }
 
        function readExt(size, lengthSize) {
            if (size < 0) size = readUInt(lengthSize);
            let type = readUInt(1);
            let data = readBin(size);
            switch (type) {
                case 255:
                    return readExtDate(data);
            }
            return { type: type, data: data };
        }
 
        function readExtDate(data) {
            if (data.length === 4) {
                let sec = ((data[0] << 24) >>> 0) +
                    ((data[1] << 16) >>> 0) +
                    ((data[2] << 8) >>> 0) +
                    data[3];
                return new Date(sec * 1000);
            }
            if (data.length === 8) {
                let ns = ((data[0] << 22) >>> 0) +
                    ((data[1] << 14) >>> 0) +
                    ((data[2] << 6) >>> 0) +
                    (data[3] >>> 2);
                let sec = ((data[3] & 0x3) * pow32) +
                    ((data[4] << 24) >>> 0) +
                    ((data[5] << 16) >>> 0) +
                    ((data[6] << 8) >>> 0) +
                    data[7];
                return new Date(sec * 1000 + ns / 1000000);
            }
            if (data.length === 12) {
                let ns = ((data[0] << 24) >>> 0) +
                    ((data[1] << 16) >>> 0) +
                    ((data[2] << 8) >>> 0) +
                    data[3];
                pos -= 8;
                let sec = readInt(8);
                return new Date(sec * 1000 + ns / 1000000);
            }
            throw new Error("Invalid data length for a date value.");
        }
    }
 
    function encodeUtf8(str) {
        let ascii = true, length = str.length;
        for (let x = 0; x < length; x++) {
            if (str.charCodeAt(x) > 127) {
                ascii = false;
                break;
            }
        }
 
        let i = 0, bytes = new Uint8Array(str.length * (ascii ? 1 : 4));
        for (let ci = 0; ci !== length; ci++) {
            let c = str.charCodeAt(ci);
            if (c < 128) {
                bytes[i++] = c;
                continue;
            }
            if (c < 2048) {
                bytes[i++] = c >> 6 | 192;
            }
            else {
                if (c > 0xd7ff && c < 0xdc00) {
                    if (++ci >= length)
                        throw new Error("UTF-8 encode: incomplete surrogate pair");
                    let c2 = str.charCodeAt(ci);
                    if (c2 < 0xdc00 || c2 > 0xdfff)
                        throw new Error("UTF-8 encode: second surrogate character 0x" + c2.toString(16) + " at index " + ci + " out of range");
                    c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
                    bytes[i++] = c >> 18 | 240;
                    bytes[i++] = c >> 12 & 63 | 128;
                }
                else bytes[i++] = c >> 12 | 224;
                bytes[i++] = c >> 6 & 63 | 128;
            }
            bytes[i++] = c & 63 | 128;
        }
        return ascii ? bytes : bytes.subarray(0, i);
    }
 
    function decodeUtf8(bytes, start, length) {
        let i = start, str = "";
        length += start;
        while (i < length) {
            let c = bytes[i++];
            if (c > 127) {
                if (c > 191 && c < 224) {
                    if (i >= length)
                        throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                    c = (c & 31) << 6 | bytes[i++] & 63;
                }
                else if (c > 223 && c < 240) {
                    if (i + 1 >= length)
                        throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                    c = (c & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
                }
                else if (c > 239 && c < 248) {
                    if (i + 2 >= length)
                        throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                    c = (c & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
                }
                else throw new Error("UTF-8 decode: unknown multibyte start 0x" + c.toString(16) + " at index " + (i - 1));
            }
            if (c <= 0xffff) str += String.fromCharCode(c);
            else if (c <= 0x10ffff) {
                c -= 0x10000;
                str += String.fromCharCode(c >> 10 | 0xd800)
                str += String.fromCharCode(c & 0x3FF | 0xdc00)
            }
            else throw new Error("UTF-8 decode: code point 0x" + c.toString(16) + " exceeds UTF-16 reach");
        }
        return str;
    }
 
    let msgpack = {
        serialize: serialize,
        deserialize: deserialize,
 
        encode: serialize,
        decode: deserialize
    };
 
    if ( true && module && typeof module.exports === "object") {
        module.exports = msgpack;
    }
    else {
        window[window.msgpackJsName || "msgpack"] = msgpack;
    }
 
})();

/***/ }),

/***/ "./src/libs/soundManager.js":
/*!**********************************!*\
  !*** ./src/libs/soundManager.js ***!
  \**********************************/
/***/ ((module) => {

module.exports.obj = function (config, UTILS) {
  var tmpSound;
  this.sounds = [], this.active = !0, this.play = function (id, volume, loop) {
    volume && this.active && ((tmpSound = this.sounds[id]) || (tmpSound = new Howl({
      src: '.././sound/' + id + '.mp3'
    }), this.sounds[id] = tmpSound), loop && tmpSound.isPlaying || (tmpSound.isPlaying = !0, tmpSound.play(), tmpSound.volume((volume || 1) * config.volumeMult), tmpSound.loop(loop)));
  }, this.toggleMute = function (id, mute) {
    (tmpSound = this.sounds[id]) && tmpSound.mute(mute);
  }, this.stop = function (id) {
    (tmpSound = this.sounds[id]) && (tmpSound.stop(), tmpSound.isPlaying = !1);
  };
};

/***/ }),

/***/ "./src/libs/utils.js":
/*!***************************!*\
  !*** ./src/libs/utils.js ***!
  \***************************/
/***/ ((module) => {

var mathABS = Math.abs,
  mathSQRT = (Math.cos, Math.sin, Math.pow, Math.sqrt),
  mathATAN2 = (mathABS = Math.abs, Math.atan2),
  mathPI = Math.PI;
module.exports.randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}, module.exports.randFloat = function (min, max) {
  return Math.random() * (max - min + 1) + min;
}, module.exports.lerp = function (value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
}, module.exports.decel = function (val, cel) {
  return val > 0 ? val = Math.max(0, val - cel) : val < 0 && (val = Math.min(0, val + cel)), val;
}, module.exports.getDistance = function (x1, y1, x2, y2) {
  return mathSQRT((x2 -= x1) * x2 + (y2 -= y1) * y2);
}, module.exports.getDirection = function (x1, y1, x2, y2) {
  return mathATAN2(y1 - y2, x1 - x2);
}, module.exports.getAngleDist = function (a, b) {
  var p = mathABS(b - a) % (2 * mathPI);
  return p > mathPI ? 2 * mathPI - p : p;
}, module.exports.isNumber = function (n) {
  return 'number' == typeof n && !isNaN(n) && isFinite(n);
}, module.exports.isString = function (s) {
  return s && 'string' == typeof s;
}, module.exports.kFormat = function (num) {
  return num > 999 ? (num / 1000)
    .toFixed(1) + 'k' : num;
}, module.exports.capitalizeFirst = function (string) {
  return string.charAt(0)
    .toUpperCase() + string.slice(1);
}, module.exports.fixTo = function (n, v) {
  return parseFloat(n.toFixed(v));
}, module.exports.sortByPoints = function (a, b) {
  return parseFloat(b.points) - parseFloat(a.points);
}, module.exports.lineInRect = function (recX, recY, recX2, recY2, x1, y1, x2, y2) {
  var minX = x1,
    maxX = x2;
  if (x1 > x2 && (minX = x2, maxX = x1), maxX > recX2 && (maxX = recX2), minX < recX && (minX = recX), minX > maxX)
    return !1;
  var minY = y1,
    maxY = y2,
    dx = x2 - x1;
  if (Math.abs(dx) > 1e-7) {
    var a = (y2 - y1) / dx,
      b = y1 - a * x1;
    minY = a * minX + b, maxY = a * maxX + b;
  }
  if (minY > maxY) {
    var tmp = maxY;
    maxY = minY, minY = tmp;
  }
  return maxY > recY2 && (maxY = recY2), minY < recY && (minY = recY), !(minY > maxY);
}, module.exports.containsPoint = function (element, x, y) {
  var bounds = element.getBoundingClientRect(),
    left = bounds.left + window.scrollX,
    top = bounds.top + window.scrollY,
    width = bounds.width,
    height = bounds.height;
  return x > left && x < left + width && y > top && y < top + height;
}, module.exports.mousifyTouchEvent = function (event) {
  var touch = event.changedTouches[0];
  event.screenX = touch.screenX, event.screenY = touch.screenY, event.clientX = touch.clientX, event.clientY = touch.clientY, event.pageX = touch.pageX, event.pageY = touch.pageY;
}, module.exports.hookTouchEvents = function (element, skipPrevent) {
  var preventDefault = !skipPrevent,
    isHovering = !1;

  function touchEnd(e) {
    module.exports.mousifyTouchEvent(e), window.setUsingTouch(!0), preventDefault && (e.preventDefault(), e.stopPropagation()), isHovering && (element.onclick && element.onclick(e), element.onmouseout && element.onmouseout(e), isHovering = !1);
  }
  element.addEventListener('touchstart', module.exports.checkTrusted(function (e) {
    module.exports.mousifyTouchEvent(e), window.setUsingTouch(!0), preventDefault && (e.preventDefault(), e.stopPropagation()), element.onmouseover && element.onmouseover(e), isHovering = !0;
  }), !1), element.addEventListener('touchmove', module.exports.checkTrusted(function (e) {
    module.exports.mousifyTouchEvent(e), window.setUsingTouch(!0), preventDefault && (e.preventDefault(), e.stopPropagation()), module.exports.containsPoint(element, e.pageX, e.pageY) ? isHovering || (element.onmouseover && element.onmouseover(e), isHovering = !0) : isHovering && (element.onmouseout && element.onmouseout(e), isHovering = !1);
  }), !1), element.addEventListener('touchend', module.exports.checkTrusted(touchEnd), !1), element.addEventListener('touchcancel', module.exports.checkTrusted(touchEnd), !1), element.addEventListener('touchleave', module.exports.checkTrusted(touchEnd), !1);
}, module.exports.removeAllChildren = function (element) {
  for (; element.hasChildNodes();)
    element.removeChild(element.lastChild);
}, module.exports.generateElement = function (config) {
  var element = document.createElement(config.tag || 'div');

  function bind(configValue, elementValue) {
    config[configValue] && (element[elementValue] = config[configValue]);
  }
  for (var key in (bind('text', 'textContent'), bind('html', 'innerHTML'), bind('class', 'className'), config)) {
    switch (key) {
    case 'tag':
    case 'text':
    case 'html':
    case 'class':
    case 'style':
    case 'hookTouch':
    case 'parent':
    case 'children':
      continue;
    }
    element[key] = config[key];
  }
  if (element.onclick && (element.onclick = module.exports.checkTrusted(element.onclick)), element.onmouseover && (element.onmouseover = module.exports.checkTrusted(element.onmouseover)), element.onmouseout && (element.onmouseout = module.exports.checkTrusted(element.onmouseout)), config.style && (element.style.cssText = config.style), config.hookTouch && module.exports.hookTouchEvents(element), config.parent && config.parent.appendChild(element), config.children)
    for (var i = 0; i < config.children.length; i++)
      element.appendChild(config.children[i]);
  return element;
}, module.exports.eventIsTrusted = function (ev) {
  return !ev || 'boolean' != typeof ev.isTrusted || ev.isTrusted;
}, module.exports.checkTrusted = function (callback) {
  return function (ev) {
    ev && ev instanceof Event && module.exports.eventIsTrusted(ev) && callback(ev);
  };
}, module.exports.randomString = function (length) {
  for (var text = '', possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}, module.exports.countInArray = function (array, val) {
  for (var count = 0, i = 0; i < array.length; i++)
    array[i] === val && count++;
  return count;
};

/***/ }),

/***/ "./src/vultr/VultrClient.js":
/*!**********************************!*\
  !*** ./src/vultr/VultrClient.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js"),
  md5 = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");

function VultrClient(baseUrl, devPort, lobbySize, lobbySpread, rawIPs) {
  'localhost' == location.hostname && (window.location.hostname = '127.0.0.1'), this.debugLog = !1, this.baseUrl = baseUrl, this.lobbySize = lobbySize, this.devPort = devPort, this.lobbySpread = lobbySpread, this.rawIPs = !!rawIPs, this.server = void 0, this.gameIndex = void 0, this.callback = void 0, this.errorCallback = void 0, this.processServers(vultr.servers);
}
VultrClient.prototype.regionInfo = {
  0: {
    name: 'Local',
    latitude: 0,
    longitude: 0
  },
  'vultr:1': {
    name: 'New Jersey',
    latitude: 40.1393329,
    longitude: -75.8521818
  },
  'vultr:2': {
    name: 'Chicago',
    latitude: 41.8339037,
    longitude: -87.872238
  },
  'vultr:3': {
    name: 'Dallas',
    latitude: 32.8208751,
    longitude: -96.8714229
  },
  'vultr:4': {
    name: 'Seattle',
    latitude: 47.6149942,
    longitude: -122.4759879
  },
  'vultr:5': {
    name: 'Los Angeles',
    latitude: 34.0207504,
    longitude: -118.691914
  },
  'vultr:6': {
    name: 'Atlanta',
    latitude: 33.7676334,
    longitude: -84.5610332
  },
  'vultr:7': {
    name: 'Amsterdam',
    latitude: 52.3745287,
    longitude: 4.7581878
  },
  'vultr:8': {
    name: 'London',
    latitude: 51.5283063,
    longitude: -0.382486
  },
  'vultr:9': {
    name: 'Frankfurt',
    latitude: 50.1211273,
    longitude: 8.496137
  },
  'vultr:12': {
    name: 'Silicon Valley',
    latitude: 37.4024714,
    longitude: -122.3219752
  },
  'vultr:19': {
    name: 'Sydney',
    latitude: -33.8479715,
    longitude: 150.651084
  },
  'vultr:24': {
    name: 'Paris',
    latitude: 48.8588376,
    longitude: 2.2773454
  },
  'vultr:25': {
    name: 'Tokyo',
    latitude: 35.6732615,
    longitude: 139.569959
  },
  'vultr:39': {
    name: 'Miami',
    latitude: 25.7823071,
    longitude: -80.3012156
  },
  'vultr:40': {
    name: 'Singapore',
    latitude: 1.3147268,
    longitude: 103.7065876
  }
}, VultrClient.prototype.start = function (callback, errorCallback) {
  this.callback = callback, this.errorCallback = errorCallback;
  this.connect(null, null, null);
  console.log("ez")
  //var query = this.parseServerQuery();
  //query ? (this.log('Found server in query.'), this.password = query[3], this.connect(query[0], query[1], query[2])) : (this.log('Pinging servers...'), this.pingServers());
}, VultrClient.prototype.parseServerQuery = function () {
  var parsed = url.parse(location.href, !0),
    serverRaw = parsed.query.server;
  if ('string' == typeof serverRaw) {
    var split = serverRaw.split(':');
    if (3 == split.length) {
      var region = split[0],
        index = parseInt(split[1]),
        gameIndex = parseInt(split[2]);
      return '0' == region || region.startsWith('vultr:') || (region = 'vultr:' + region), [
        region,
        index,
        gameIndex,
        parsed.query.password
      ];
    }
    this.errorCallback('Invalid number of server parameters in ' + serverRaw);
  }
}, VultrClient.prototype.findServer = function (region, index) {
  var serverList = this.servers[region];
  if (Array.isArray(serverList)) {
    for (var i = 0; i < serverList.length; i++) {
      var server = serverList[i];
      if (server.index == index)
        return server;
    }
    console.warn('Could not find server in region ' + region + ' with index ' + index + '.');
  } else
    this.errorCallback('No server list for region ' + region);
}, VultrClient.prototype.pingServers = function () {
  var _this = this,
    requests = [];
  for (var region in this.servers)
    if (this.servers.hasOwnProperty(region)) {
      var serverList = this.servers[region],
        targetServer = serverList[Math.floor(Math.random() * serverList.length)];
      _this.connect(null, null, null);
      /*null != targetServer ? function (serverList, targetServer) {
          var request = new XMLHttpRequest();
          request.onreadystatechange = function (requestEvent) {
              var request = requestEvent.target;
              if (4 == request.readyState)
                  if (200 == request.status) {
                      for (var i = 0; i < requests.length; i++)
                          requests[i].abort();
                      _this.log('Connecting to region', targetServer.region);
                      var targetGame = _this.seekServer(targetServer.region);
                      _this.connect(targetGame[0], targetGame[1], targetGame[2]);
                  } else
                      console.warn('Error pinging ' + targetServer.ip + ' in region ' + region);
          };
          var targetAddress = '//' + _this.serverAddress(targetServer.ip, !0) + ':' + _this.serverPort(targetServer) + '/ping';
          request.open('GET', targetAddress, !0), request.send(null), _this.log('Pinging', targetAddress), requests.push(request);
      }(0, targetServer) : console.log('No target server for region ' + region);*/
    }
}, VultrClient.prototype.seekServer = function (region, isPrivate, gameMode) {
  null == gameMode && (gameMode = 'random'), null == isPrivate && (isPrivate = !1);
  const gameModeList = ['random'];
  var lobbySize = this.lobbySize,
    lobbySpread = this.lobbySpread,
    servers = this.servers[region].flatMap(function (s) {
      var gameIndex = 0;
      return s.games.map(function (g) {
        var currentGameIndex = gameIndex++;
        return {
          region: s.region,
          index: s.index * s.games.length + currentGameIndex,
          gameIndex: currentGameIndex,
          gameCount: s.games.length,
          playerCount: g.playerCount,
          isPrivate: g.isPrivate
        };
      });
    })
    .filter(function (s) {
      return !s.isPrivate;
    })
    .filter(function (s) {
      return !isPrivate || 0 == s.playerCount && s.gameIndex >= s.gameCount / 2;
    })
    .filter(function (s) {
      return 'random' == gameMode || gameModeList[s.index % gameModeList.length].key == gameMode;
    })
    .sort(function (a, b) {
      return b.playerCount - a.playerCount;
    })
    .filter(function (s) {
      return s.playerCount < lobbySize;
    });
  if (isPrivate && servers.reverse(), 0 != servers.length) {
    var randomSpread = Math.min(lobbySpread, servers.length),
      serverIndex = Math.floor(Math.random() * randomSpread),
      rawServer = servers[serverIndex = Math.min(serverIndex, servers.length - 1)],
      serverRegion = rawServer.region,
      gameIndex = (serverIndex = Math.floor(rawServer.index / rawServer.gameCount), rawServer.index % rawServer.gameCount);
    return this.log('Found server.'), [
      serverRegion,
      serverIndex,
      gameIndex
    ];
  }
  this.errorCallback('No open servers.');
}, VultrClient.prototype.connect = function (region, index, game) {
  if (!this.connected) {
    //metak
    /*var server = this.findServer(region, index);
    null != server ? (this.log('Connecting to server', server, 'with game index', game), server.games[game].playerCount >= this.lobbySize ? this.errorCallback('Server is already full.') : (window.history.replaceState(document.title, document.title, this.generateHref(region, index, game, this.password)), this.server = server, this.gameIndex = game, this.log('Calling callback with address', this.serverAddress(server.ip), 'on port', this.serverPort(server), 'with game index', game), this.callback(this.serverAddress(server.ip), this.serverPort(server), game))) : this.errorCallback('Failed to find server for region ' + region + ' and index ' + index);*/
  }
}, VultrClient.prototype.switchServer = function (region, index, game, password) {
  this.switchingServers = !0, window.location.href = this.generateHref(region, index, game, password);
}, VultrClient.prototype.generateHref = function (region, index, game, password) {
  var href = '/?server=' + (region = this.stripRegion(region)) + ':' + index + ':' + game;
  return password && (href += '&password=' + encodeURIComponent(password)), href;
}, VultrClient.prototype.serverAddress = function (ip, forceSecure) {
  return 'a' // '127.0.0.1' == ip || '7f000001' == ip || '903d62ef5d1c2fecdcaeb5e7dd485eff' == ip ? window.location.hostname : this.rawIPs ? forceSecure ? 'ip_' + this.hashIP(ip) + '.' + this.baseUrl : ip : 'ip_' + ip + '.' + this.baseUrl;
}, VultrClient.prototype.serverPort = function (server) {
  return 0 == server.region ? this.devPort : location.protocol.startsWith('https') ? 443 : 80;
}, VultrClient.prototype.processServers = function (serverList) {
  this.servers = [];
}, VultrClient.prototype.ipToHex = function (ip) {
  return ip.split('.')
    .map(component => ('00' + parseInt(component)
        .toString(16))
      .substr(-2))
    .join('')
    .toLowerCase();
}, VultrClient.prototype.hashIP = function (ip) {
  return md5(this.ipToHex(ip));
}, VultrClient.prototype.log = function () {
  return this.debugLog ? console.log.apply(void 0, arguments) : console.verbose ? console.verbose.apply(void 0, arguments) : void 0;
}, VultrClient.prototype.stripRegion = function (region) {
  return region.startsWith('vultr:') ? region = region.slice(6) : region.startsWith('do:') && (region = region.slice(3)), region;
}, window.testVultrClient = function () {
  var assertIndex = 1;

  function assert(actual, expected) {
    (actual = '' + actual) == (expected = '' + expected) ? console.log(`Assert ${ assertIndex } passed.`): console.warn(`Assert ${ assertIndex } failed. Expected ${ expected }, got ${ actual }.`), assertIndex++;
  }
  var client1 = new VultrClient('test.io', -1, 5, 1, !1);
  client1.errorCallback = function (error) {}, client1.processServers(function (regions) {
    var servers = [];
    for (var region in regions)
      for (var regionServers = regions[region], i = 0; i < regionServers.length; i++)
        servers.push({
          ip: region + ':' + i,
          scheme: 'testing',
          region: region,
          index: i,
          games: regionServers[i].map(p => ({
            playerCount: p,
            isPrivate: !1
          }))
        });
    return servers;
  }({
    1: [
      [
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0
      ]
    ],
    2: [
      [
        5,
        1,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0
      ]
    ],
    3: [
      [
        5,
        0,
        1,
        5
      ],
      [
        0,
        0,
        0,
        0
      ]
    ],
    4: [
      [
        5,
        1,
        1,
        5
      ],
      [
        1,
        0,
        0,
        0
      ]
    ],
    5: [
      [
        5,
        1,
        1,
        5
      ],
      [
        1,
        0,
        4,
        0
      ]
    ],
    6: [
      [
        5,
        5,
        5,
        5
      ],
      [
        2,
        3,
        1,
        4
      ]
    ],
    7: [
      [
        5,
        5,
        5,
        5
      ],
      [
        5,
        5,
        5,
        5
      ]
    ]
  })), assert(client1.seekServer(1, !1), [
    1,
    0,
    0
  ]), assert(client1.seekServer(1, !0), [
    1,
    1,
    3
  ]), assert(client1.seekServer(2, !1), [
    2,
    0,
    1
  ]), assert(client1.seekServer(2, !0), [
    2,
    1,
    3
  ]), assert(client1.seekServer(3, !1), [
    3,
    0,
    2
  ]), assert(client1.seekServer(3, !0), [
    3,
    1,
    3
  ]), assert(client1.seekServer(4, !1), [
    4,
    0,
    1
  ]), assert(client1.seekServer(4, !0), [
    4,
    1,
    3
  ]), assert(client1.seekServer(5, !1), [
    5,
    1,
    2
  ]), assert(client1.seekServer(5, !0), [
    5,
    1,
    3
  ]), assert(client1.seekServer(6, !1), [
    6,
    1,
    3
  ]), assert(client1.seekServer(6, !0), void 0), assert(client1.seekServer(7, !1), void 0), assert(client1.seekServer(7, !0), void 0), console.log('Tests passed.');
};
var concat = function (x, y) {
  return x.concat(y);
};
Array.prototype.flatMap = function (f) {
  return function (f, xs) {
    return xs.map(f)
      .reduce(concat, []);
  }(f, this);
}, module.exports = VultrClient;

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/bad-words/lib/lang.json":
/*!**********************************************!*\
  !*** ./node_modules/bad-words/lib/lang.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"words":["ahole","anus","ash0le","ash0les","asholes","ass","Ass Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f u c k","f u c k e r","fag","fag1t","faget","fagg1t","faggit","faggot","fagg0t","fagit","fags","fagz","faig","faigs","fart","flipping the bird","fuck","fucker","fuckin","fucking","fucks","Fudge Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha Fucker","Motha Fuker","Motha Fukkah","Motha Fukker","Mother Fucker","Mother Fukah","Mother Fuker","Mother Fukkah","Mother Fukker","mother-fucker","Mutha Fucker","Mutha Fukah","Mutha Fuker","Mutha Fukkah","Mutha Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slag","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
window.loadedScript = !0;
var isProd = location.origin.includes("http://")
__webpack_require__(/*! ./libs/msgpack.js */ "./src/libs/msgpack.js");
__webpack_require__(/*! ./libs/modernizr.js */ "./src/libs/modernizr.js");
var io = __webpack_require__(/*! ./libs/io-client.js */ "./src/libs/io-client.js"),
  UTILS = __webpack_require__(/*! ./libs/utils.js */ "./src/libs/utils.js"),
  animText = __webpack_require__(/*! ./libs/animText.js */ "./src/libs/animText.js"),
  config = __webpack_require__(/*! ./config.js */ "./src/config.js"),
  GameObject = __webpack_require__(/*! ./js/data/gameObject.js */ "./src/js/data/gameObject.js"),
  items = __webpack_require__(/*! ./js/data/items.js */ "./src/js/data/items.js"),
  MapManager = __webpack_require__(/*! ./js/data/mapManager.js */ "./src/js/data/mapManager.js"),
  ObjectManager = __webpack_require__(/*! ./js/data/objectManager.js */ "./src/js/data/objectManager.js"),
  Player = __webpack_require__(/*! ./js/data/player.js */ "./src/js/data/player.js"),
  store = __webpack_require__(/*! ./js/data/store.js */ "./src/js/data/store.js"),
  Projectile = __webpack_require__(/*! ./js/data/projectile.js */ "./src/js/data/projectile.js"),
  ProjectileManager = __webpack_require__(/*! ./js/data/projectileManager.js */ "./src/js/data/projectileManager.js"),
  SoundManager = (__webpack_require__(/*! ./libs/soundManager.js */ "./src/libs/soundManager.js").obj),
  textManager = new animText.TextManager(),
  vultrClient = new(__webpack_require__(/*! ./vultr/VultrClient.js */ "./src/vultr/VultrClient.js"))('mohmoh.eu', 3000, config.maxPlayers, 5, !1);
vultrClient.debugLog = !1;
var startedConnecting = !1;

function connectSocketIfReady() {
  if (startedConnecting) return;
  startedConnecting = true;
  window.grecaptcha.execute("6LcuxskpAAAAADyVCDYxrXrKEG4w-utU5skiTBZH", {
      action: "homepage"
    })
    .then(function (e) {
      connectSocket(e)
    })
}

function connectSocket(token) {
  var wsAddress = (isProd ? "ws" : "wss") + '://' + location.host;
   true && (wsAddress += "/?token=" + token), io.connect(wsAddress, function (error) {
    io.send("budv", 0);
    pingSocket(), setInterval(() => pingSocket(), 2500), (error !== "Invalid Connection" && error) ? disconnect(error) : (enterGameButton.onclick = UTILS.checkTrusted(function () {
      ! function () {
        if (error) {
          disconnect(error)
        } else {
          enterGame();
        }
      }();
    }), UTILS.hookTouchEvents(enterGameButton), joinPartyButton.onclick = UTILS.checkTrusted(function () {
      setTimeout(function () {
        ! function () {
          var currentKey = serverBrowser.value,
            key = prompt('party key', currentKey);
          key && (window.onbeforeunload = void 0, window.location.href = '/?server=' + key);
        }();
      }, 10);
    }), UTILS.hookTouchEvents(joinPartyButton), settingsButton.onclick = UTILS.checkTrusted(function () {
      guideCard.classList.contains('showing') ? (guideCard.classList.remove('showing'), settingsButtonTitle.innerText = 'Settings') : (guideCard.classList.add('showing'), settingsButtonTitle.innerText = 'Close');
    }), UTILS.hookTouchEvents(settingsButton), allianceButton.onclick = UTILS.checkTrusted(function () {
      resetMoveDir(), 'block' != allianceMenu.style.display ? showAllianceMenu() : allianceMenu.style.display = 'none';
    }), UTILS.hookTouchEvents(allianceButton), storeButton.onclick = UTILS.checkTrusted(function () {
      'block' != storeMenu.style.display ? (storeMenu.style.display = 'block', allianceMenu.style.display = 'none', closeChat(), generateStoreList()) : storeMenu.style.display = 'none';
    }), UTILS.hookTouchEvents(storeButton), chatButton.onclick = UTILS.checkTrusted(function () {
      toggleChat();
    }), UTILS.hookTouchEvents(chatButton), mapDisplay.onclick = UTILS.checkTrusted(function () {
      sendMapPing();
    }), UTILS.hookTouchEvents(mapDisplay), function () {
      for (var i = 0; i < icons.length; ++i) {
        var tmpSprite = new Image();
        tmpSprite.onload = function () {
          this.isLoaded = !0;
        }, tmpSprite.src = '.././img/icons/' + icons[i] + '.png', iconSprites[icons[i]] = tmpSprite;
      }
    }(), loadingText.style.display = 'none', menuCardHolder.style.display = 'block', nameInput.value = getSavedVal('moo_name') || '', function () {
      var savedNativeValue = getSavedVal('native_resolution');
      setUseNativeResolution(savedNativeValue ? 'true' == savedNativeValue : 'undefined' != typeof cordova), showPing = 'true' == getSavedVal('show_ping'), pingDisplay.hidden = !showPing, getSavedVal('moo_moosic'), setInterval(function () {
        window.cordova && (document.getElementById('downloadButtonContainer')
          .classList.add('cordova'), document.getElementById('mobileDownloadButtonContainer')
          .classList.add('cordova'));
      }, 1000), updateSkinColorPicker(), UTILS.removeAllChildren(actionBar);
      for (var i = 0; i < items.weapons.length + items.list.length; ++i)
        ! function (i) {
          UTILS.generateElement({
            id: 'actionBarItem' + i,
            class: 'actionBarItem',
            style: 'display:none',
            onmouseout: function () {
              showItemInfo();
            },
            parent: actionBar
          });
        }(i);
      for (i = 0; i < items.list.length + items.weapons.length; ++i)
        ! function (i) {
          var tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = tmpCanvas.height = 66;
          var tmpContext = tmpCanvas.getContext('2d');
          if (tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2), tmpContext.imageSmoothingEnabled = !1, tmpContext.webkitImageSmoothingEnabled = !1, tmpContext.mozImageSmoothingEnabled = !1, items.weapons[i]) {
            tmpContext.rotate(Math.PI / 4 + Math.PI);
            var tmpSprite = new Image();
            toolSprites[items.weapons[i].src] = tmpSprite, tmpSprite.onload = function () {
                this.isLoaded = !0;
                var tmpPad = 1 / (this.height / this.width),
                  tmpMlt = items.weapons[i].iPad || 1;
                tmpContext.drawImage(this, -tmpCanvas.width * tmpMlt * config.iconPad * tmpPad / 2, -tmpCanvas.height * tmpMlt * config.iconPad / 2, tmpCanvas.width * tmpMlt * tmpPad * config.iconPad, tmpCanvas.height * tmpMlt * config.iconPad), tmpContext.fillStyle = 'rgba(0, 0, 70, 0.1)', tmpContext.globalCompositeOperation = 'source-atop', tmpContext.fillRect(-tmpCanvas.width / 2, -tmpCanvas.height / 2, tmpCanvas.width, tmpCanvas.height), document.getElementById('actionBarItem' + i)
                  .style.backgroundImage = 'url(' + tmpCanvas.toDataURL() + ')';
              }, tmpSprite.src = '.././img/weapons/' + items.weapons[i].src + '.png', (tmpUnit = document.getElementById('actionBarItem' + i))
              .onmouseover = UTILS.checkTrusted(function () {
                showItemInfo(items.weapons[i], !0);
              }), tmpUnit.onclick = UTILS.checkTrusted(function () {
                selectToBuild(i, !0);
              }), UTILS.hookTouchEvents(tmpUnit);
          } else {
            tmpSprite = getItemSprite(items.list[i - items.weapons.length], !0);
            var tmpUnit, tmpScale = Math.min(tmpCanvas.width - config.iconPadding, tmpSprite.width);
            tmpContext.globalAlpha = 1, tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale), tmpContext.fillStyle = 'rgba(0, 0, 70, 0.1)', tmpContext.globalCompositeOperation = 'source-atop', tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale), document.getElementById('actionBarItem' + i)
              .style.backgroundImage = 'url(' + tmpCanvas.toDataURL() + ')', (tmpUnit = document.getElementById('actionBarItem' + i))
              .onmouseover = UTILS.checkTrusted(function () {
                showItemInfo(items.list[i - items.weapons.length]);
              }), tmpUnit.onclick = UTILS.checkTrusted(function () {
                selectToBuild(i - items.weapons.length);
              }), UTILS.hookTouchEvents(tmpUnit);
          }
        }(i);
      nameInput.ontouchstart = UTILS.checkTrusted(function (e) {
        e.preventDefault();
        var newValue = prompt('enter name', e.currentTarget.value);
        newValue && (e.currentTarget.value = newValue.slice(0, 15));
      }), nativeResolutionCheckbox.checked = useNativeResolution, nativeResolutionCheckbox.onchange = UTILS.checkTrusted(function (e) {
        setUseNativeResolution(e.target.checked);
      }), showPingCheckbox.checked = showPing, showPingCheckbox.onchange = UTILS.checkTrusted(function (e) {
        showPing = showPingCheckbox.checked, pingDisplay.hidden = !showPing, saveVal('show_ping', showPing ? 'true' : 'false');
      });
    }());
  }, {
    id: setInitData,
    d: disconnect,
    1: setupGame,
    2: addPlayer,
    4: removePlayer,
    33: updatePlayers,
    5: updateLeaderboard,
    6: loadGameObject,
    a: loadAI,
    aa: animateAI,
    7: gatherAnimation,
    8: wiggleGameObject,
    sp: shootTurret,
    9: updatePlayerValue,
    h: updateHealth,
    11: killPlayer,
    12: killObject,
    13: killObjects,
    14: updateItemCounts,
    15: updateAge,
    16: updateUpgrades,
    17: updateItems,
    18: addProjectile,
    19: remProjectile,
    20: serverShutdownNotice,
    ac: addAlliance,
    ad: deleteAlliance,
    an: allianceNotification,
    st: setPlayerTeam,
    sa: setAlliancePlayers,
    us: updateStoreItems,
    ch: receiveChat,
    mm: updateMinimap,
    t: showText,
    p: pingMap,
    pp: pingSocketResponse,
    panel: function () {},
    loadAbility: function () {},
    removeAbility: function () {}
  }), setupServerStatus(), setTimeout(() => updateServerList(), 3000);
}
var canStore = 0,
  Sound = new SoundManager(config, UTILS),
  mathPI = Math.PI,
  mathPI2 = 2 * mathPI;

function saveVal(name, val) {
  canStore && localStorage.setItem(name, val);
}

function getSavedVal(name) {
  return canStore ? localStorage.getItem(name) : null;
}
Math.lerpAngle = function (value1, value2, amount) {
  Math.abs(value2 - value1) > mathPI && (value1 > value2 ? value2 += mathPI2 : value1 += mathPI2);
  var value = value2 + (value1 - value2) * amount;
  return value >= 0 && value <= mathPI2 ? value : value % mathPI2;
}, CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  return w < 2 * r && (r = w / 2), h < 2 * r && (r = h / 2), r < 0 && (r = 0), this.beginPath(), this.moveTo(x + r, y), this.arcTo(x + w, y, x + w, y + h, r), this.arcTo(x + w, y + h, x, y + h, r), this.arcTo(x, y + h, x, y, r), this.arcTo(x, y, x + w, y, r), this.closePath(), this;
}, 'undefined' != typeof Storage && (canStore = !0); //,// getSavedVal("consent") || (consentBlock.style.display="block"),window.checkTerms=function(e){e?(consentBlock.style.display="none",saveVal("consent",1)):$("#consentShake").effect("shake")};
var useNativeResolution, showPing, delta, now, lastSent, attackState, player, playerSID, tmpObj, camX, camY, tmpDir, screenWidth, screenHeight, moofoll = getSavedVal('moofoll'),
  pixelDensity = 1,
  lastUpdate = Date.now(),
  ais = [],
  players = [],
  alliances = [],
  gameObjects = [],
  projectiles = [],
  projectileManager = new ProjectileManager(Projectile, projectiles, players, ais, objectManager, items, config, UTILS),
  AiManager = __webpack_require__(/*! ./js/data/aiManager.js */ "./src/js/data/aiManager.js"),
  AI = __webpack_require__(/*! ./js/data/ai.js */ "./src/js/data/ai.js"),
  aiManager = new AiManager(ais, AI, players, items, null, config, UTILS),
  waterMult = 1,
  waterPlus = 0,
  mouseX = 0,
  mouseY = 0,
  controllingTouch = {
    id: -1,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  },
  attackingTouch = {
    id: -1,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  },
  skinColor = 0,
  maxScreenWidth = config.maxScreenWidth,
  maxScreenHeight = config.maxScreenHeight,
  inGame = !1,
  mainMenu = (document.getElementById('ad-container'), document.getElementById('mainMenu')),
  enterGameButton = document.getElementById('enterGame'),
  promoImageButton = document.getElementById('promoImg'),
  partyButton = document.getElementById('partyButton'),
  joinPartyButton = document.getElementById('joinPartyButton'),
  settingsButton = document.getElementById('settingsButton'),
  settingsButtonTitle = settingsButton.getElementsByTagName('span')[0],
  allianceButton = document.getElementById('allianceButton'),
  storeButton = document.getElementById('storeButton'),
  chatButton = document.getElementById('chatButton'),
  gameCanvas = document.getElementById('gameCanvas'),
  mainContext = gameCanvas.getContext('2d'),
  serverBrowser = document.getElementById('serverBrowser'),
  nativeResolutionCheckbox = document.getElementById('nativeResolution'),
  showPingCheckbox = document.getElementById('showPing'),
  pingDisplay = (document.getElementById('playMusic'), document.getElementById('pingDisplay')),
  shutdownDisplay = document.getElementById('shutdownDisplay'),
  menuCardHolder = document.getElementById('menuCardHolder'),
  guideCard = document.getElementById('guideCard'),
  loadingText = document.getElementById('loadingText'),
  gameUI = document.getElementById('gameUI'),
  actionBar = document.getElementById('actionBar'),
  scoreDisplay = document.getElementById('scoreDisplay'),
  foodDisplay = document.getElementById('foodDisplay'),
  woodDisplay = document.getElementById('woodDisplay'),
  stoneDisplay = document.getElementById('stoneDisplay'),
  killCounter = document.getElementById('killCounter'),
  leaderboardData = document.getElementById('leaderboardData'),
  nameInput = document.getElementById('nameInput'),
  itemInfoHolder = document.getElementById('itemInfoHolder'),
  ageText = document.getElementById('ageText'),
  ageBarBody = document.getElementById('ageBarBody'),
  upgradeHolder = document.getElementById('upgradeHolder'),
  upgradeCounter = document.getElementById('upgradeCounter'),
  allianceMenu = document.getElementById('allianceMenu'),
  allianceHolder = document.getElementById('allianceHolder'),
  allianceManager = document.getElementById('allianceManager'),
  mapDisplay = document.getElementById('mapDisplay'),
  diedText = document.getElementById('diedText'),
  skinColorHolder = document.getElementById('skinColorHolder'),
  mapContext = mapDisplay.getContext('2d');
mapDisplay.width = 300, mapDisplay.height = 300;
var storeMenu = document.getElementById('storeMenu'),
  storeHolder = document.getElementById('storeHolder'),
  noticationDisplay = document.getElementById('noticationDisplay'),
  hats = store.hats,
  accessories = store.accessories,
  objectManager = new ObjectManager(GameObject, gameObjects, UTILS, config),
  outlineColor = '#525252',
  darkOutlineColor = '#3d3f42';

function setInitData(data) {
  alliances = data.teams;
}
var featuredYoutuber = document.getElementById('featuredYoutube'),
  youtuberList = [{
    name: 'Join the discord -',
    link: 'https://discord.gg/WgynbMjmv9'
  }, ],
  tmpYoutuber = youtuberList[UTILS.randInt(0, youtuberList.length - 1)];
featuredYoutuber.innerHTML = '<a target=\'_blank\' class=\'ytLink\' href=\'' + tmpYoutuber.link + '\'><i class=\'material-icons\' style=\'vertical-align: top;\'>&#xE064;</i> ' + tmpYoutuber.name + '</a>';
var inWindow = !0,
  didLoad = !1,
  captchaReady = !1;

function disconnect(reason) {
  io.close(), showLoadingText(reason);
}

function showLoadingText(text) {
  mainMenu.style.display = 'block', gameUI.style.display = 'none', menuCardHolder.style.display = 'none', diedText.style.display = 'none', loadingText.style.display = 'block', loadingText.innerHTML = text + '<a href=\'javascript:window.location.href=window.location.href\' class=\'ytLink\'>reload</a>';
}
window.onblur = function () {
  inWindow = !1;
}, window.onfocus = function () {
  inWindow = !0, player && player.alive && resetMoveDir();
}, window.onload = function () {
  didLoad = !0, connectSocketIfReady();
}, window.captchaCallback = function () {
  captchaReady = !0, connectSocketIfReady();
}, gameCanvas.oncontextmenu = function () {
  return !1;
};

function setupServerStatus() {
  var altServerText, altServerURL, tmpHTML = '',
    overallTotal = 0;
  tmpHTML += '<option disabled>All Servers - 100 players</option>', serverBrowser.innerHTML = tmpHTML, 'mohmoh.eu' == location.hostname ? (altServerText = 'Back to MohMoh', altServerURL = '//mohmoh.eu/') : (altServerText = 'Try the sandbox', altServerURL = '//mohmoh.eu/'), document.getElementById('altServer')
    .innerHTML = '<a href=\'' + altServerURL + '\'>' + altServerText + '<i class=\'material-icons\' style=\'font-size:10px;vertical-align:middle\'>arrow_forward_ios</i></a>';
}

function updateServerList() {
  /*
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      4 == this.readyState && (200 == this.status ? (window.vultr = JSON.parse(this.responseText), vultrClient.processServers(vultr.servers), setupServerStatus()) : console.error('Failed to load server data with status code:', this.status));
  }, xmlhttp.open('GET', '/serverData', !0), xmlhttp.send();*/
}
serverBrowser.addEventListener('change', UTILS.checkTrusted(function () {
  let parts = serverBrowser.value.split(':');
  vultrClient.switchServer(parts[0], parts[1], parts[2]);
}));
var preAdInterval = 300000,
  preAdLastShowTime = 0,
  preAdGameCount = 0;

function showPreAd() {
  if (!window.adsbygoogle)
    return console.log('Failed to load video ad API'), void enterGame();
  window.adsbygoogle.push({
    type: 'next',
    adBreakDone: () => {
      enterGame();
    }
  });
}

function showItemInfo(item, isWeapon, isStoreItem) {
  if (player && item)
    if (UTILS.removeAllChildren(itemInfoHolder), itemInfoHolder.classList.add('visible'), UTILS.generateElement({
        id: 'itemInfoName',
        text: UTILS.capitalizeFirst(item.name),
        parent: itemInfoHolder
      }), UTILS.generateElement({
        id: 'itemInfoDesc',
        text: item.desc,
        parent: itemInfoHolder
      }), isStoreItem);
    else if (isWeapon)
    UTILS.generateElement({
      class: 'itemInfoReq',
      text: item.type ? 'secondary' : 'primary',
      parent: itemInfoHolder
    });
  else {
    for (var i = 0; i < item.req.length; i += 2)
      UTILS.generateElement({
        class: 'itemInfoReq',
        html: item.req[i] + '<span class=\'itemInfoReqVal\'> x' + item.req[i + 1] + '</span>',
        parent: itemInfoHolder
      });
    item.group.limit && UTILS.generateElement({
      class: 'itemInfoLmt',
      text: (player.itemCounts[item.group.id] || 0) + '/' + item.group.limit,
      parent: itemInfoHolder
    });
  } else
    itemInfoHolder.classList.remove('visible');
}
window.adsbygoogle && adsbygoogle.push({
  preloadAdBreaks: 'on'
}), window.showPreAd = showPreAd;
var lastDeath, minimapData, mapMarker, allianceNotifications = [],
  alliancePlayers = [];

function allianceNotification(sid, name) {
  allianceNotifications.push({
    sid: sid,
    name: name
  }), updateNotifications();
}

function updateNotifications() {
  if (allianceNotifications[0]) {
    var tmpN = allianceNotifications[0];
    UTILS.removeAllChildren(noticationDisplay), noticationDisplay.style.display = 'block', UTILS.generateElement({
      class: 'notificationText',
      text: tmpN.name,
      parent: noticationDisplay
    }), UTILS.generateElement({
      class: 'notifButton',
      html: '<i class=\'material-icons\' style=\'font-size:28px;color:#cc5151;\'>&#xE14C;</i>',
      parent: noticationDisplay,
      onclick: function () {
        aJoinReq(0);
      },
      hookTouch: !0
    }), UTILS.generateElement({
      class: 'notifButton',
      html: '<i class=\'material-icons\' style=\'font-size:28px;color:#8ecc51;\'>&#xE876;</i>',
      parent: noticationDisplay,
      onclick: function () {
        aJoinReq(1);
      },
      hookTouch: !0
    });
  } else
    noticationDisplay.style.display = 'none';
}

function addAlliance(data) {
  alliances.push(data), 'block' == allianceMenu.style.display && showAllianceMenu();
}

function setPlayerTeam(team, isOwner) {
  player && (player.team = team, player.isOwner = isOwner, 'block' == allianceMenu.style.display && showAllianceMenu());
}

function setAlliancePlayers(data) {
  alliancePlayers = data, 'block' == allianceMenu.style.display && showAllianceMenu();
}

function deleteAlliance(sid) {
  for (var i = alliances.length - 1; i >= 0; i--)
    alliances[i].sid == sid && alliances.splice(i, 1);
  'block' == allianceMenu.style.display && showAllianceMenu();
}

function showAllianceMenu() {
  if (player && player.alive) {
    if (closeChat(), storeMenu.style.display = 'none', allianceMenu.style.display = 'block', UTILS.removeAllChildren(allianceHolder), player.team)
      for (var i = 0; i < alliancePlayers.length; i += 2)
        ! function (i) {
          var tmp = UTILS.generateElement({
            class: 'allianceItem',
            style: 'color:' + (alliancePlayers[i] == player.sid ? '#fff' : 'rgba(255,255,255,0.6)'),
            text: alliancePlayers[i + 1],
            parent: allianceHolder
          });
          player.isOwner && alliancePlayers[i] != player.sid && UTILS.generateElement({
            class: 'joinAlBtn',
            text: 'Kick',
            onclick: function () {
              kickFromClan(alliancePlayers[i]);
            },
            hookTouch: !0,
            parent: tmp
          });
        }(i);
    else if (alliances.length)
      for (i = 0; i < alliances.length; ++i)
        ! function (i) {
          var tmp = UTILS.generateElement({
            class: 'allianceItem',
            style: 'color:' + (alliances[i].sid == player.team ? '#fff' : 'rgba(255,255,255,0.6)'),
            text: alliances[i].sid,
            parent: allianceHolder
          });
          UTILS.generateElement({
            class: 'joinAlBtn',
            text: 'Join',
            onclick: function () {
              sendJoin(i);
            },
            hookTouch: !0,
            parent: tmp
          });
        }(i);
    else
      UTILS.generateElement({
        class: 'allianceItem',
        text: 'No Tribes Yet',
        parent: allianceHolder
      });
    UTILS.removeAllChildren(allianceManager), player.team ? UTILS.generateElement({
      class: 'allianceButtonM',
      style: 'width: 360px',
      text: player.isOwner ? 'Delete Tribe' : 'Leave Tribe',
      onclick: function () {
        leaveAlliance();
      },
      hookTouch: !0,
      parent: allianceManager
    }) : (UTILS.generateElement({
      tag: 'input',
      type: 'text',
      id: 'allianceInput',
      maxLength: 7,
      placeholder: 'unique name',
      ontouchstart: function (ev) {
        ev.preventDefault();
        var newValue = prompt('unique name', ev.currentTarget.value);
        ev.currentTarget.value = newValue.slice(0, 7);
      },
      parent: allianceManager
    }), UTILS.generateElement({
      tag: 'div',
      class: 'allianceButtonM',
      style: 'width: 140px;',
      text: 'Create',
      onclick: function () {
        createAlliance();
      },
      hookTouch: !0,
      parent: allianceManager
    }));
  }
}

function aJoinReq(join) {
  io.send('11', allianceNotifications[0].sid, join), allianceNotifications.splice(0, 1), updateNotifications();
}

function kickFromClan(sid) {
  io.send('12', sid);
}

function sendJoin(index) {
  io.send('10', alliances[index].sid);
}

function createAlliance() {
  io.send('8', document.getElementById('allianceInput')
    .value);
}

function leaveAlliance() {
  allianceNotifications = [], updateNotifications(), io.send('9');
}
var tmpPing, mapPings = [];

function pingMap(x, y) {
  for (var i = 0; i < mapPings.length; ++i)
    if (!mapPings[i].active) {
      tmpPing = mapPings[i];
      break;
    }
  tmpPing || (tmpPing = new function () {
    this.init = function (x, y) {
      this.scale = 0, this.x = x, this.y = y, this.active = !0;
    }, this.update = function (ctxt, delta) {
      this.active && (this.scale += 0.05 * delta, this.scale >= config.mapPingScale ? this.active = !1 : (ctxt.globalAlpha = 1 - Math.max(0, this.scale / config.mapPingScale), ctxt.beginPath(), ctxt.arc(this.x / config.mapScale * mapDisplay.width, this.y / config.mapScale * mapDisplay.width, this.scale, 0, 2 * Math.PI), ctxt.stroke()));
    };
  }(), mapPings.push(tmpPing)), tmpPing.init(x, y);
}

function updateMinimap(data) {
  minimapData = data;
}
var currentStoreIndex = 0;

function updateStoreItems(type, id, index) {
  index ? type ? player.tailIndex = id : player.tails[id] = 1 : type ? player.skinIndex = id : player.skins[id] = 1, 'block' == storeMenu.style.display && generateStoreList();
}

function generateStoreList() {
  if (player) {
    UTILS.removeAllChildren(storeHolder);
    for (var index = currentStoreIndex, tmpArray = index ? accessories : hats, i = 0; i < tmpArray.length; ++i)
      tmpArray[i].dontSell || function (i) {
        var tmp = UTILS.generateElement({
          id: 'storeDisplay' + i,
          class: 'storeItem',
          onmouseout: function () {
            showItemInfo();
          },
          onmouseover: function () {
            showItemInfo(tmpArray[i], !1, !0);
          },
          parent: storeHolder
        });
        UTILS.hookTouchEvents(tmp, !0), UTILS.generateElement({
          tag: 'img',
          class: 'hatPreview',
          src: '../img/' + (index ? 'accessories/access_' : 'hats/hat_') + tmpArray[i].id + (tmpArray[i].topSprite ? '_p' : '') + '.png',
          parent: tmp
        }), UTILS.generateElement({
          tag: 'span',
          text: tmpArray[i].name,
          parent: tmp
        }), (index ? player.tails[tmpArray[i].id] : player.skins[tmpArray[i].id]) ? (index ? player.tailIndex : player.skinIndex) == tmpArray[i].id ? UTILS.generateElement({
          class: 'joinAlBtn',
          style: 'margin-top: 5px',
          text: 'Unequip',
          onclick: function () {
            storeEquip(0, index);
          },
          hookTouch: !0,
          parent: tmp
        }) : UTILS.generateElement({
          class: 'joinAlBtn',
          style: 'margin-top: 5px',
          text: 'Equip',
          onclick: function () {
            storeEquip(tmpArray[i].id, index);
          },
          hookTouch: !0,
          parent: tmp
        }) : (UTILS.generateElement({
          class: 'joinAlBtn',
          style: 'margin-top: 5px',
          text: 'Buy',
          onclick: function () {
            storeBuy(tmpArray[i].id, index);
          },
          hookTouch: !0,
          parent: tmp
        }), UTILS.generateElement({
          tag: 'span',
          class: 'itemPrice',
          text: tmpArray[i].price,
          parent: tmp
        }));
      }(i);
  }
}

function storeEquip(id, index) {
  io.send('13c', 0, id, index);
}

function storeBuy(id, index) {
  io.send('13c', 1, id, index);
}

function hideAllWindows() {
  storeMenu.style.display = 'none', allianceMenu.style.display = 'none', closeChat();
}

function updateItems(data, wpn) {
  data && (wpn ? player.weapons = data : player.items = data);
  for (var i = 0; i < items.list.length; ++i) {
    var tmpI = items.weapons.length + i;
    document.getElementById('actionBarItem' + tmpI)
      .style.display = player.items.indexOf(items.list[i].id) >= 0 ? 'inline-block' : 'none';
  }
  for (i = 0; i < items.weapons.length; ++i)
    document.getElementById('actionBarItem' + i)
    .style.display = player.weapons[items.weapons[i].type] == items.weapons[i].id ? 'inline-block' : 'none';
}

function setUseNativeResolution(useNative) {
  useNativeResolution = useNative, pixelDensity = useNative && window.devicePixelRatio || 1, nativeResolutionCheckbox.checked = useNative, saveVal('native_resolution', useNative.toString()), resize();
}

function updateSkinColorPicker() {
  for (var tmpHTML = '', i = 0; i < config.skinColors.length; ++i)
    tmpHTML += i == skinColor ? '<div class=\'skinColorItem activeSkin\' style=\'background-color:' + config.skinColors[i] + '\' onclick=\'selectSkinColor(' + i + ')\'></div>' : '<div class=\'skinColorItem\' style=\'background-color:' + config.skinColors[i] + '\' onclick=\'selectSkinColor(' + i + ')\'></div>';
  skinColorHolder.innerHTML = tmpHTML;
}
var chatBox = document.getElementById('chatBox'),
  chatHolder = document.getElementById('chatHolder');

function toggleChat() {
  usingTouch ? setTimeout(function () {
    var chatMessage = prompt('chat message');
    chatMessage && sendChat(chatMessage);
  }, 1) : 'block' == chatHolder.style.display ? (chatBox.value && sendChat(chatBox.value), closeChat()) : (storeMenu.style.display = 'none', allianceMenu.style.display = 'none', chatHolder.style.display = 'block', chatBox.focus(), resetMoveDir()), chatBox.value = '';
}

function sendChat(message) {
  io.send('ch', message.slice(0, 30));
}

function closeChat() {
  chatBox.value = '', chatHolder.style.display = 'none';
}
var usingTouch, lastDir, profanityList = [
  'cunt',
  'whore',
  'fuck',
  'shit',
  'faggot',
  'nigger',
  'nigga',
  'dick',
  'vagina',
  'minge',
  'cock',
  'rape',
  'cum',
  'sex',
  'tits',
  'penis',
  'clit',
  'pussy',
  'meatcurtain',
  'jizz',
  'prune',
  'douche',
  'wanker',
  'damn',
  'bitch',
  'dick',
  'fag',
  'bastard'
];

function receiveChat(sid, message) {
  var tmpPlayer = findPlayerBySID(sid);
  tmpPlayer && (tmpPlayer.chatMessage = function (text) {
    for (var tmpString, i = 0; i < profanityList.length; ++i)
      if (text.indexOf(profanityList[i]) > -1) {
        tmpString = '';
        for (var y = 0; y < profanityList[i].length; ++y)
          tmpString += tmpString.length ? 'o' : 'M';
        var re = new RegExp(profanityList[i], 'g');
        text = text.replace(re, tmpString);
      }
    return text;
  }(message), tmpPlayer.chatCountdown = config.chatCountdown);
}

function resize() {
  screenWidth = window.innerWidth, screenHeight = window.innerHeight;
  var scaleFillNative = Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) * pixelDensity;
  gameCanvas.width = screenWidth * pixelDensity, gameCanvas.height = screenHeight * pixelDensity, gameCanvas.style.width = screenWidth + 'px', gameCanvas.style.height = screenHeight + 'px', mainContext.setTransform(scaleFillNative, 0, 0, scaleFillNative, (screenWidth * pixelDensity - maxScreenWidth * scaleFillNative) / 2, (screenHeight * pixelDensity - maxScreenHeight * scaleFillNative) / 2);
}

function setUsingTouch(using) {
  (usingTouch = using) ? guideCard.classList.add('touch'): guideCard.classList.remove('touch');
}

function touchEnd(ev) {
  ev.preventDefault(), ev.stopPropagation(), setUsingTouch(!0);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    t.identifier == controllingTouch.id ? (controllingTouch.id = -1, sendMoveDir()) : t.identifier == attackingTouch.id && (attackingTouch.id = -1, player.buildIndex >= 0 && (attackState = 1, sendAtckState()), attackState = 0, sendAtckState());
  }
}

function getAttackDir() {
  return player ? (-1 != attackingTouch.id ? lastDir = Math.atan2(attackingTouch.currentY - attackingTouch.startY, attackingTouch.currentX - attackingTouch.startX) : player.lockDir || usingTouch || (lastDir = Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2)), UTILS.fixTo(lastDir || 0, 2)) : 0;
}
window.addEventListener('resize', UTILS.checkTrusted(resize)), resize(), setUsingTouch(!1), window.setUsingTouch = setUsingTouch, gameCanvas.addEventListener('touchmove', UTILS.checkTrusted(function (ev) {
  ev.preventDefault(), ev.stopPropagation(), setUsingTouch(!0);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    t.identifier == controllingTouch.id ? (controllingTouch.currentX = t.pageX, controllingTouch.currentY = t.pageY, sendMoveDir()) : t.identifier == attackingTouch.id && (attackingTouch.currentX = t.pageX, attackingTouch.currentY = t.pageY, attackState = 1);
  }
}), !1), gameCanvas.addEventListener('touchstart', UTILS.checkTrusted(function (ev) {
  if (!inGame)
    return ev.preventDefault(), !1;
  ev.preventDefault(), ev.stopPropagation(), setUsingTouch(!0);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    t.pageX < document.body.scrollWidth / 2 && -1 == controllingTouch.id ? (controllingTouch.id = t.identifier, controllingTouch.startX = controllingTouch.currentX = t.pageX, controllingTouch.startY = controllingTouch.currentY = t.pageY, sendMoveDir()) : t.pageX > document.body.scrollWidth / 2 && -1 == attackingTouch.id && (attackingTouch.id = t.identifier, attackingTouch.startX = attackingTouch.currentX = t.pageX, attackingTouch.startY = attackingTouch.currentY = t.pageY, player.buildIndex < 0 && (attackState = 1, sendAtckState()));
  }
}), !1), gameCanvas.addEventListener('touchend', UTILS.checkTrusted(touchEnd), !1), gameCanvas.addEventListener('touchcancel', UTILS.checkTrusted(touchEnd), !1), gameCanvas.addEventListener('touchleave', UTILS.checkTrusted(touchEnd), !1), gameCanvas.addEventListener('mousemove', function (e) {
  e.preventDefault(), e.stopPropagation(), setUsingTouch(!1), mouseX = e.clientX, mouseY = e.clientY;
}, !1), gameCanvas.addEventListener('mousedown', function (e) {
  setUsingTouch(!1), 1 != attackState && (attackState = 1, sendAtckState());
}, !1), gameCanvas.addEventListener('mouseup', function (e) {
  setUsingTouch(!1), 0 != attackState && (attackState = 0, sendAtckState());
}, !1);
var keys = {},
  moveKeys = {
    87: [
      0,
      -1
    ],
    38: [
      0,
      -1
    ],
    83: [
      0,
      1
    ],
    40: [
      0,
      1
    ],
    65: [
      -1,
      0
    ],
    37: [
      -1,
      0
    ],
    68: [
      1,
      0
    ],
    39: [
      1,
      0
    ]
  };

function resetMoveDir() {
  keys = {}, io.send('rmd');
}

function keysActive() {
  return 'block' != allianceMenu.style.display && 'block' != chatHolder.style.display;
}

function sendAtckState() {
  player && player.alive && io.send('c', attackState, player.buildIndex >= 0 ? getAttackDir() : null);
}
window.addEventListener('keydown', UTILS.checkTrusted(function (event) {
  var keyNum = event.which || event.keyCode || 0;
  27 == keyNum ? hideAllWindows() : player && player.alive && keysActive() && (keys[keyNum] || (keys[keyNum] = 1, 69 == keyNum ? io.send('7', 1) : 67 == keyNum ? (mapMarker || (mapMarker = {}), mapMarker.x = player.x, mapMarker.y = player.y) : 88 == keyNum ? (player.lockDir = player.lockDir ? 0 : 1, io.send('7', 0)) : null != player.weapons[keyNum - 49] ? selectToBuild(player.weapons[keyNum - 49], !0) : null != player.items[keyNum - 49 - player.weapons.length] ? selectToBuild(player.items[keyNum - 49 - player.weapons.length]) : 81 == keyNum ? selectToBuild(player.items[0]) : 82 == keyNum ? sendMapPing() : moveKeys[keyNum] ? sendMoveDir() : 32 == keyNum && (attackState = 1, sendAtckState())));
})), window.addEventListener('keyup', UTILS.checkTrusted(function (event) {
  if (player && player.alive) {
    var keyNum = event.which || event.keyCode || 0;
    13 == keyNum ? toggleChat() : keysActive() && keys[keyNum] && (keys[keyNum] = 0, moveKeys[keyNum] ? sendMoveDir() : 32 == keyNum && (attackState = 0, sendAtckState()));
  }
}));
var lastMoveDir = void 0;

function sendMoveDir() {
  var newMoveDir = function () {
    var dx = 0,
      dy = 0;
    if (-1 != controllingTouch.id)
      dx += controllingTouch.currentX - controllingTouch.startX, dy += controllingTouch.currentY - controllingTouch.startY;
    else
      for (var key in moveKeys) {
        var tmpDir = moveKeys[key];
        dx += !!keys[key] * tmpDir[0], dy += !!keys[key] * tmpDir[1];
      }
    return 0 == dx && 0 == dy ? void 0 : UTILS.fixTo(Math.atan2(dy, dx), 2);
  }();
  (null == lastMoveDir || null == newMoveDir || Math.abs(newMoveDir - lastMoveDir) > 0.3) && (io.send('33', newMoveDir), lastMoveDir = newMoveDir);
}

function sendMapPing() {
  io.send('14', 1);
}

function selectToBuild(index, wpn) {
  io.send('5', index, wpn);
}

function enterGame() {
  saveVal('moo_name', nameInput.value), !inGame && io.connected && (inGame = !0, Sound.stop('menu'), showLoadingText('Loading...'), io.send('sp', {
      name: nameInput.value,
      moofoll: moofoll,
      skin: skinColor
    })),
    function () {
      var cookieIcon = document.getElementById('ot-sdk-btn-floating');
      cookieIcon && (cookieIcon.style.display = 'none');
    }();
}
var firstSetup = !0;

function setupGame(yourSID) {
  loadingText.style.display = 'none', menuCardHolder.style.display = 'block', mainMenu.style.display = 'none', keys = {}, playerSID = yourSID, attackState = 0, inGame = !0, firstSetup && (firstSetup = !1, gameObjects.length = 0);
}

function showText(x, y, value, type) {
  textManager.showText(x, y, 50, 0.18, 500, Math.abs(value), value >= 0 ? '#fff' : '#8ecc51');
}
var deathTextScale = 99999;

function killPlayer() {
  inGame = !1,
    function () {
      var cookieIcon = document.getElementById('ot-sdk-btn-floating');
      cookieIcon && (cookieIcon.style.display = 'block');
    }();
  try {
    factorem.refreshAds([2], !0);
  } catch (e) {}
  gameUI.style.display = 'none', hideAllWindows(), lastDeath = {
    x: player.x,
    y: player.y
  }, loadingText.style.display = 'none', diedText.style.display = 'block', diedText.style.fontSize = '0px', deathTextScale = 0, setTimeout(function () {
    menuCardHolder.style.display = 'block', mainMenu.style.display = 'block', diedText.style.display = 'none';
  }, config.deathFadeout), updateServerList();
}

function killObjects(sid) {
  player && objectManager.removeAllItems(sid);
}

function killObject(sid) {
  objectManager.disableBySid(sid);
}

function updateStatusDisplay() {
  scoreDisplay.innerText = player.points, foodDisplay.innerText = player.food, woodDisplay.innerText = player.wood, stoneDisplay.innerText = player.stone, killCounter.innerText = player.kills;
}
var iconSprites = {},
  icons = [
    'crown',
    'skull'
  ],
  tmpList = [];

function updateUpgrades(points, age) {
  if (player.upgradePoints = points, player.upgrAge = age, points > 0) {
    tmpList.length = 0, UTILS.removeAllChildren(upgradeHolder);
    for (var i = 0; i < items.weapons.length; ++i)
      items.weapons[i].age == age && (null == items.weapons[i].pre || true || 0) && (UTILS.generateElement({
          id: 'upgradeItem' + i,
          class: 'actionBarItem',
          onmouseout: function () {
            showItemInfo();
          },
          parent: upgradeHolder
        })
        .style.backgroundImage = document.getElementById('actionBarItem' + i)
        .style.backgroundImage, tmpList.push(i));
    for (i = 0; i < items.list.length; ++i)
      if (items.list[i].age == age && (null == items.list[i].pre || true || 0)) {
        var tmpI = items.weapons.length + i;
        UTILS.generateElement({
            id: 'upgradeItem' + tmpI,
            class: 'actionBarItem',
            onmouseout: function () {
              showItemInfo();
            },
            parent: upgradeHolder
          })
          .style.backgroundImage = document.getElementById('actionBarItem' + tmpI)
          .style.backgroundImage, tmpList.push(tmpI);
      }
    for (i = 0; i < tmpList.length; i++)
      ! function (i) {
        var tmpItem = document.getElementById('upgradeItem' + i);
        tmpItem.onmouseover = function () {
          items.weapons[i] ? showItemInfo(items.weapons[i], !0) : showItemInfo(items.list[i - items.weapons.length]);
        }, tmpItem.onclick = UTILS.checkTrusted(function () {
          io.send('6', i);
        }), UTILS.hookTouchEvents(tmpItem);
      }(tmpList[i]);
    tmpList.length ? (upgradeHolder.style.display = 'block', upgradeCounter.style.display = 'block', upgradeCounter.innerHTML = 'SELECT ITEMS (' + points + ')') : (upgradeHolder.style.display = 'none', upgradeCounter.style.display = 'none', showItemInfo());
  } else
    upgradeHolder.style.display = 'none', upgradeCounter.style.display = 'none', showItemInfo();
}

function updateAge(xp, mxp, age) {
  null != xp && (player.XP = xp), null != mxp && (player.maxXP = mxp), null != age && (player.age = age), age == config.maxAge ? (ageText.innerHTML = 'MAX AGE', ageBarBody.style.width = '100%') : (ageText.innerHTML = 'AGE ' + player.age, ageBarBody.style.width = player.XP / player.maxXP * 100 + '%');
}

function updateLeaderboard(data) {
  UTILS.removeAllChildren(leaderboardData);
  for (var tmpC = 1, i = 0; i < data.length; i += 3)
    ! function (i) {
      UTILS.generateElement({
        class: 'leaderHolder',
        parent: leaderboardData,
        children: [
          UTILS.generateElement({
            class: 'leaderboardItem',
            style: 'color:' + (data[i] == playerSID ? '#fff' : 'rgba(255,255,255,0.6)'),
            text: tmpC + '. ' + ('' != data[i + 1] ? data[i + 1] : 'unknown')
          }),
          UTILS.generateElement({
            class: 'leaderScore',
            text: UTILS.kFormat(data[i + 2]) || '0'
          })
        ]
      });
    }(i), tmpC++;
}
let lastAttackDir = null;

function renderControl(startX, startY, currentX, currentY) {
  mainContext.save(), mainContext.setTransform(1, 0, 0, 1, 0, 0), mainContext.scale(pixelDensity, pixelDensity);
  var controlRadius = 50;
  mainContext.beginPath(), mainContext.arc(startX, startY, controlRadius, 0, 2 * Math.PI, !1), mainContext.closePath(), mainContext.fillStyle = 'rgba(255, 255, 255, 0.3)', mainContext.fill(), controlRadius = 50;
  var offsetX = currentX - startX,
    offsetY = currentY - startY,
    mag = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
    divisor = mag > controlRadius ? mag / controlRadius : 1;
  offsetX /= divisor, offsetY /= divisor, mainContext.beginPath(), mainContext.arc(startX + offsetX, startY + offsetY, 0.5 * controlRadius, 0, 2 * Math.PI, !1), mainContext.closePath(), mainContext.fillStyle = 'white', mainContext.fill(), mainContext.restore();
}

function renderProjectiles(layer, xOffset, yOffset) {
  for (var i = 0; i < projectiles.length; ++i)
    (tmpObj = projectiles[i])
    .active && tmpObj.layer == layer && (tmpObj.update(delta), tmpObj.active && isOnScreen(tmpObj.x - xOffset, tmpObj.y - yOffset, tmpObj.scale) && (mainContext.save(), mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset), mainContext.rotate(tmpObj.dir), renderProjectile(0, 0, tmpObj, mainContext, 1), mainContext.restore()));
}
var projectileSprites = {};

function renderProjectile(x, y, obj, ctxt, debug) {
  if (obj.src) {
    var tmpSrc = items.projectiles[obj.indx].src,
      tmpSprite = projectileSprites[tmpSrc];
    tmpSprite || ((tmpSprite = new Image())
      .onload = function () {
        this.isLoaded = !0;
      }, tmpSprite.src = '.././img/weapons/' + tmpSrc + '.png', projectileSprites[tmpSrc] = tmpSprite), tmpSprite.isLoaded && ctxt.drawImage(tmpSprite, x - obj.scale / 2, y - obj.scale / 2, obj.scale, obj.scale);
  } else
    1 == obj.indx && (ctxt.fillStyle = '#939393', renderCircle(x, y, obj.scale, ctxt));
}

function renderWaterBodies(xOffset, yOffset, ctxt, padding) {
  var tmpW = config.riverWidth + padding,
    tmpY = config.mapScale / 2 - yOffset - tmpW / 2;
  tmpY < maxScreenHeight && tmpY + tmpW > 0 && ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW);
}

function renderGameObjects(layer, xOffset, yOffset) {
  for (var tmpSprite, tmpX, tmpY, i = 0; i < gameObjects.length; ++i)
    (tmpObj = gameObjects[i])
    .active && (tmpX = tmpObj.x + tmpObj.xWiggle - xOffset, tmpY = tmpObj.y + tmpObj.yWiggle - yOffset, 0 == layer && tmpObj.update(delta), tmpObj.layer == layer && isOnScreen(tmpX, tmpY, tmpObj.scale + (tmpObj.blocker || 0)) && (mainContext.globalAlpha = tmpObj.hideFromEnemy ? 0.6 : 1, tmpObj.isItem ? (tmpSprite = getItemSprite(tmpObj), mainContext.save(), mainContext.translate(tmpX, tmpY), mainContext.rotate(tmpObj.dir), mainContext.drawImage(tmpSprite, -tmpSprite.width / 2, -tmpSprite.height / 2), tmpObj.blocker && (mainContext.strokeStyle = '#db6e6e', mainContext.globalAlpha = 0.3, mainContext.lineWidth = 6, renderCircle(0, 0, tmpObj.blocker, mainContext, !1, !0)), mainContext.restore()) : (tmpSprite = getResSprite(tmpObj), mainContext.drawImage(tmpSprite, tmpX - tmpSprite.width / 2, tmpY - tmpSprite.height / 2))));
}

function gatherAnimation(sid, didHit, index) {
  (tmpObj = findPlayerBySID(sid)) && tmpObj.startAnim(didHit, index);
}

function renderPlayers(xOffset, yOffset, zIndex) {
  mainContext.globalAlpha = 1;
  for (var i = 0; i < players.length; ++i)
    (tmpObj = players[i])
    .zIndex == zIndex && (tmpObj.animate(delta), tmpObj.visible && (tmpObj.skinRot += 0.002 * delta, tmpDir = (tmpObj == player ? getAttackDir() : tmpObj.dir) + tmpObj.dirPlus, mainContext.save(), mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset), mainContext.rotate(tmpDir), renderPlayer(tmpObj, mainContext), mainContext.restore()));
}

function renderPlayer(e, t) {
  (t = t || mainContext)
  .lineWidth = 5.5, t.lineJoin = 'miter';
  var i = Math.PI / 4 * (items.weapons[e.weaponIndex].armS || 1),
    n = e.buildIndex < 0 && items.weapons[e.weaponIndex].hndS || 1,
    s = e.buildIndex < 0 && items.weapons[e.weaponIndex].hndD || 1;
  if (e.tailIndex > 0 && function (index, ctxt, owner) {
      if (!(tmpSkin = accessSprites[index])) {
        var tmpImage = new Image();
        tmpImage.onload = function () {
          this.isLoaded = !0, this.onload = null;
        }, tmpImage.src = '.././img/accessories/access_' + index + '.png', accessSprites[index] = tmpImage, tmpSkin = tmpImage;
      }
      var tmpObj = accessPointers[index];
      if (!tmpObj) {
        for (var i = 0; i < accessories.length; ++i)
          if (accessories[i].id == index) {
            tmpObj = accessories[i];
            break;
          }
        accessPointers[index] = tmpObj;
      }
      tmpSkin.isLoaded && (ctxt.save(), ctxt.translate(-20 - (tmpObj.xOff || 0), 0), tmpObj.spin && ctxt.rotate(owner.skinRot), ctxt.drawImage(tmpSkin, -tmpObj.scale / 2, -tmpObj.scale / 2, tmpObj.scale, tmpObj.scale), ctxt.restore());
    }(e.tailIndex, t, e), e.buildIndex < 0 && !items.weapons[e.weaponIndex].aboveHand && (renderTool(items.weapons[e.weaponIndex], config.weaponVariants[e.weaponVariant].src, e.scale, 0, t), null == items.weapons[e.weaponIndex].projectile || items.weapons[e.weaponIndex].hideProjectile || renderProjectile(e.scale, 0, items.projectiles[items.weapons[e.weaponIndex].projectile], mainContext)), t.fillStyle = config.skinColors[e.skinColor], renderCircle(e.scale * Math.cos(i), e.scale * Math.sin(i), 14), renderCircle(e.scale * s * Math.cos(-i * n), e.scale * s * Math.sin(-i * n), 14), e.buildIndex < 0 && items.weapons[e.weaponIndex].aboveHand && (renderTool(items.weapons[e.weaponIndex], config.weaponVariants[e.weaponVariant].src, e.scale, 0, t), null == items.weapons[e.weaponIndex].projectile || items.weapons[e.weaponIndex].hideProjectile || renderProjectile(e.scale, 0, items.projectiles[items.weapons[e.weaponIndex].projectile], mainContext)), e.buildIndex >= 0) {
    var o = getItemSprite(items.list[e.buildIndex]);
    t.drawImage(o, e.scale - items.list[e.buildIndex].holdOffset, -o.width / 2);
  }
  renderCircle(0, 0, e.scale, t), e.skinIndex > 0 && (t.rotate(Math.PI / 2), function renderSkin(index, ctxt, parentSkin, owner) {
    if (!(tmpSkin = skinSprites[index])) {
      var tmpImage = new Image();
      tmpImage.onload = function () {
        this.isLoaded = !0, this.onload = null;
      }, tmpImage.src = '.././img/hats/hat_' + index + '.png', skinSprites[index] = tmpImage, tmpSkin = tmpImage;
    }
    var tmpObj = parentSkin || skinPointers[index];
    if (!tmpObj) {
      for (var i = 0; i < hats.length; ++i)
        if (hats[i].id == index) {
          tmpObj = hats[i];
          break;
        }
      skinPointers[index] = tmpObj;
    }
    tmpSkin.isLoaded && ctxt.drawImage(tmpSkin, -tmpObj.scale / 2, -tmpObj.scale / 2, tmpObj.scale, tmpObj.scale), !parentSkin && tmpObj.topSprite && (ctxt.save(), ctxt.rotate(owner.skinRot), renderSkin(index + '_top', ctxt, tmpObj, owner), ctxt.restore());
  }(e.skinIndex, t, null, e));
}
var tmpSkin, skinSprites = {},
  skinPointers = {},
  accessSprites = {},
  accessPointers = {},
  toolSprites = {};

function renderTool(obj, variant, x, y, ctxt) {
  var tmpSrc = obj.src + (variant || ''),
    tmpSprite = toolSprites[tmpSrc];
  tmpSprite || ((tmpSprite = new Image())
    .onload = function () {
      this.isLoaded = !0;
    }, tmpSprite.src = '.././img/weapons/' + tmpSrc + '.png', toolSprites[tmpSrc] = tmpSprite), tmpSprite.isLoaded && ctxt.drawImage(tmpSprite, x + obj.xOff - obj.length / 2, y + obj.yOff - obj.width / 2, obj.length, obj.width);
}
var gameObjectSprites = {};

function getResSprite(obj) {
  var biomeID = obj.y >= config.mapScale - config.snowBiomeTop ? 2 : obj.y <= config.snowBiomeTop ? 1 : 0,
    tmpIndex = obj.type + '_' + obj.scale + '_' + biomeID,
    tmpSprite = gameObjectSprites[tmpIndex];
  if (!tmpSprite) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = 2.1 * obj.scale + 5.5;
    var tmpContext = tmpCanvas.getContext('2d');
    if (tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2), tmpContext.rotate(UTILS.randFloat(0, Math.PI)), tmpContext.strokeStyle = outlineColor, tmpContext.lineWidth = 5.5, 0 == obj.type)
      for (var tmpScale, i = 0; i < 2; ++i)
        renderStar(tmpContext, 7, tmpScale = tmpObj.scale * (i ? 0.5 : 1), 0.7 * tmpScale), tmpContext.fillStyle = biomeID ? i ? '#fff' : '#e3f1f4' : i ? '#b4db62' : '#9ebf57', tmpContext.fill(), i || tmpContext.stroke();
    else if (1 == obj.type)
      if (2 == biomeID)
        tmpContext.fillStyle = '#606060', renderStar(tmpContext, 6, 0.3 * obj.scale, 0.71 * obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#89a54c', renderCircle(0, 0, 0.55 * obj.scale, tmpContext), tmpContext.fillStyle = '#a5c65b', renderCircle(0, 0, 0.3 * obj.scale, tmpContext, !0);
      else {
        var tmpRange;
        ! function (ctxt, spikes, outer, inner) {
          var tmpOuter, rot = Math.PI / 2 * 3,
            step = Math.PI / 6;
          ctxt.beginPath(), ctxt.moveTo(0, -inner);
          for (var i = 0; i < 6; i++)
            tmpOuter = UTILS.randInt(outer + 0.9, 1.2 * outer), ctxt.quadraticCurveTo(Math.cos(rot + step) * tmpOuter, Math.sin(rot + step) * tmpOuter, Math.cos(rot + 2 * step) * inner, Math.sin(rot + 2 * step) * inner), rot += 2 * step;
          ctxt.lineTo(0, -inner), ctxt.closePath();
        }(tmpContext, 0, tmpObj.scale, 0.7 * tmpObj.scale), tmpContext.fillStyle = biomeID ? '#e3f1f4' : '#89a54c', tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = biomeID ? '#6a64af' : '#c15555';
        var rotVal = mathPI2 / 4;
        for (i = 0; i < 4; ++i)
          renderCircle((tmpRange = UTILS.randInt(tmpObj.scale / 3.5, tmpObj.scale / 2.3)) * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(10, 12), tmpContext);
      }
    else
      2 != obj.type && 3 != obj.type || (tmpContext.fillStyle = 2 == obj.type ? 2 == biomeID ? '#938d77' : '#939393' : '#e0c655', renderStar(tmpContext, 3, obj.scale, obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = 2 == obj.type ? 2 == biomeID ? '#b2ab90' : '#bcbcbc' : '#ebdca3', renderStar(tmpContext, 3, 0.55 * obj.scale, 0.65 * obj.scale), tmpContext.fill());
    tmpSprite = tmpCanvas, gameObjectSprites[tmpIndex] = tmpSprite;
  }
  return tmpSprite;
}
var itemSprites = [];

function getItemSprite(obj, asIcon) {
  var tmpSprite = itemSprites[obj.id];
  if (!tmpSprite || asIcon) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = 2.5 * obj.scale + 5.5 + (items.list[obj.id].spritePadding || 0);
    var tmpContext = tmpCanvas.getContext('2d');
    if (tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2), tmpContext.rotate(asIcon ? 0 : Math.PI / 2), tmpContext.strokeStyle = outlineColor, tmpContext.lineWidth = 5.5 * (asIcon ? tmpCanvas.width / 81 : 1), 'apple' == obj.name) {
      tmpContext.fillStyle = '#c15555', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#89a54c';
      var leafDir = -Math.PI / 2;
      ! function (x, y, l, r, ctxt) {
        var endX = x + 25 * Math.cos(r),
          endY = y + 25 * Math.sin(r);
        ctxt.moveTo(x, y), ctxt.beginPath(), ctxt.quadraticCurveTo((x + endX) / 2 + 10 * Math.cos(r + Math.PI / 2), (y + endY) / 2 + 10 * Math.sin(r + Math.PI / 2), endX, endY), ctxt.quadraticCurveTo((x + endX) / 2 - 10 * Math.cos(r + Math.PI / 2), (y + endY) / 2 - 10 * Math.sin(r + Math.PI / 2), x, y), ctxt.closePath(), ctxt.fill(), ctxt.stroke();
      }(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir), 0, leafDir + Math.PI / 2, tmpContext);
    } else if ('cookie' == obj.name) {
      tmpContext.fillStyle = '#cca861', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#937c4b';
      for (var rotVal = mathPI2 / (chips = 4), i = 0; i < chips; ++i)
        renderCircle((tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)) * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, !0);
    } else if ('cheese' == obj.name) {
      var chips, tmpRange;
      for (tmpContext.fillStyle = '#f4f3ac', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#c3c28b', rotVal = mathPI2 / (chips = 4), i = 0; i < chips; ++i)
        renderCircle((tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)) * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, !0);
    } else if ('wood wall' == obj.name || 'stone wall' == obj.name || 'castle wall' == obj.name) {
      tmpContext.fillStyle = 'castle wall' == obj.name ? '#83898e' : 'wood wall' == obj.name ? '#a5974c' : '#939393';
      var sides = 'castle wall' == obj.name ? 4 : 3;
      renderStar(tmpContext, sides, 1.1 * obj.scale, 1.1 * obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = 'castle wall' == obj.name ? '#9da4aa' : 'wood wall' == obj.name ? '#c9b758' : '#bcbcbc', renderStar(tmpContext, sides, 0.65 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
    } else if ('spikes' == obj.name || 'greater spikes' == obj.name || 'poison spikes' == obj.name || 'spinning spikes' == obj.name) {
      tmpContext.fillStyle = 'poison spikes' == obj.name ? '#7b935d' : '#939393';
      var tmpScale = 0.6 * obj.scale;
      renderStar(tmpContext, 'spikes' == obj.name ? 5 : 6, obj.scale, tmpScale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, tmpScale, tmpContext), tmpContext.fillStyle = '#c9b758', renderCircle(0, 0, tmpScale / 2, tmpContext, !0);
    } else if ('windmill' == obj.name || 'faster windmill' == obj.name || 'power mill' == obj.name)
      tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fillStyle = '#c9b758', renderRectCircle(0, 0, 1.5 * obj.scale, 29, 4, tmpContext), tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, 0.5 * obj.scale, tmpContext);
    else if ('mine' == obj.name)
      tmpContext.fillStyle = '#939393', renderStar(tmpContext, 3, obj.scale, obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#bcbcbc', renderStar(tmpContext, 3, 0.55 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
    else if ('sapling' == obj.name)
      for (i = 0; i < 2; ++i)
        renderStar(tmpContext, 7, tmpScale = obj.scale * (i ? 0.5 : 1), 0.7 * tmpScale), tmpContext.fillStyle = i ? '#b4db62' : '#9ebf57', tmpContext.fill(), i || tmpContext.stroke();
    else if ('pit trap' == obj.name)
      tmpContext.fillStyle = '#a5974c', renderStar(tmpContext, 3, 1.1 * obj.scale, 1.1 * obj.scale), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = outlineColor, renderStar(tmpContext, 3, 0.65 * obj.scale, 0.65 * obj.scale), tmpContext.fill();
    else if ('boost pad' == obj.name)
      tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#dbd97d',
      function (s, ctx) {
        ctx = ctx || mainContext;
        var h = s * (Math.sqrt(3) / 2);
        ctx.beginPath(), ctx.moveTo(0, -h / 2), ctx.lineTo(-s / 2, h / 2), ctx.lineTo(s / 2, h / 2), ctx.lineTo(0, -h / 2), ctx.fill(), ctx.closePath();
      }(1 * obj.scale, tmpContext);
    else if ('turret' == obj.name)
      tmpContext.fillStyle = '#a5974c', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#939393', renderRect(0, -25, 0.9 * obj.scale, 50, tmpContext), renderCircle(0, 0, 0.6 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke();
    else if ('platform' == obj.name) {
      tmpContext.fillStyle = '#cebd5f';
      var tmpS = 2 * obj.scale,
        tmpW = tmpS / 4,
        tmpX = -obj.scale / 2;
      for (i = 0; i < 4; ++i)
        renderRect(tmpX - tmpW / 2, 0, tmpW, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpX += tmpS / 4;
    } else
      'healing pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#db6e6e', renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'spawn pad' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderRect(0, 0, 2 * obj.scale, 2 * obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.fillStyle = '#71aad6', renderCircle(0, 0, 0.6 * obj.scale, tmpContext)) : 'blocker' == obj.name ? (tmpContext.fillStyle = '#7e7f82', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.rotate(Math.PI / 4), tmpContext.fillStyle = '#db6e6e', renderRectCircle(0, 0, 0.65 * obj.scale, 20, 4, tmpContext, !0)) : 'teleporter' == obj.name && (tmpContext.fillStyle = '#7e7f82', renderCircle(0, 0, obj.scale, tmpContext), tmpContext.fill(), tmpContext.stroke(), tmpContext.rotate(Math.PI / 4), tmpContext.fillStyle = '#d76edb', renderCircle(0, 0, 0.5 * obj.scale, tmpContext, !0));
    tmpSprite = tmpCanvas, asIcon || (itemSprites[obj.id] = tmpSprite);
  }
  return tmpSprite;
}

function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
  (tmpContext = tmpContext || mainContext)
  .beginPath(), tmpContext.arc(x, y, scale, 0, 2 * Math.PI), dontFill || tmpContext.fill(), dontStroke || tmpContext.stroke();
}

function renderStar(ctxt, spikes, outer, inner) {
  var x, y, rot = Math.PI / 2 * 3,
    step = Math.PI / spikes;
  ctxt.beginPath(), ctxt.moveTo(0, -outer);
  for (var i = 0; i < spikes; i++)
    x = Math.cos(rot) * outer, y = Math.sin(rot) * outer, ctxt.lineTo(x, y), rot += step, x = Math.cos(rot) * inner, y = Math.sin(rot) * inner, ctxt.lineTo(x, y), rot += step;
  ctxt.lineTo(0, -outer), ctxt.closePath();
}

function renderRect(x, y, w, h, ctxt, stroke) {
  ctxt.fillRect(x - w / 2, y - h / 2, w, h), stroke || ctxt.strokeRect(x - w / 2, y - h / 2, w, h);
}

function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
  ctxt.save(), ctxt.translate(x, y), seg = Math.ceil(seg / 2);
  for (var i = 0; i < seg; i++)
    renderRect(0, 0, 2 * s, sw, ctxt, stroke), ctxt.rotate(Math.PI / seg);
  ctxt.restore();
}

function loadGameObject(data) {
  for (var i = 0; i < data.length;)
    objectManager.add(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], data[i + 5], items.list[data[i + 6]], !0, data[i + 7] >= 0 ? {
      sid: data[i + 7]
    } : null), i += 8;
}

function wiggleGameObject(dir, sid) {
  (tmpObj = findObjectBySid(sid)) && (tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir), tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir));
}

function shootTurret(sid, dir) {
  (tmpObj = findObjectBySid(sid)) && (tmpObj.dir = dir, tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir + Math.PI), tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir + Math.PI));
}

function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
  inWindow && (projectileManager.addProjectile(x, y, dir, range, speed, indx, null, null, layer)
    .sid = sid);
}

function remProjectile(sid, range) {
  for (var i = 0; i < projectiles.length; ++i)
    projectiles[i].sid == sid && (projectiles[i].range = range);
}

function animateAI(sid) {
  (tmpObj = findAIBySID(sid)) && tmpObj.startAnim();
}

function loadAI(data) {
  for (var i = 0; i < ais.length; ++i)
    ais[i].forcePos = !ais[i].visible, ais[i].visible = !1;
  if (data) {
    var tmpTime = Date.now();
    for (i = 0; i < data.length;)
      (tmpObj = findAIBySID(data[i])) ? (tmpObj.index = data[i + 1], tmpObj.t1 = void 0 === tmpObj.t2 ? tmpTime : tmpObj.t2, tmpObj.t2 = tmpTime, tmpObj.x1 = tmpObj.x, tmpObj.y1 = tmpObj.y, tmpObj.x2 = data[i + 2], tmpObj.y2 = data[i + 3], tmpObj.d1 = void 0 === tmpObj.d2 ? data[i + 4] : tmpObj.d2, tmpObj.d2 = data[i + 4], tmpObj.health = data[i + 5], tmpObj.dt = 0, tmpObj.visible = !0) : ((tmpObj = aiManager.spawn(data[i + 2], data[i + 3], data[i + 4], data[i + 1]))
        .x2 = tmpObj.x, tmpObj.y2 = tmpObj.y, tmpObj.d2 = tmpObj.dir, tmpObj.health = data[i + 5], aiManager.aiTypes[data[i + 1]].name || (tmpObj.name = config.cowNames[data[i + 6]]), tmpObj.forcePos = !0, tmpObj.sid = data[i], tmpObj.visible = !0), i += 7;
  }
}
var aiSprites = {};

function renderAI(obj, ctxt) {
  var tmpIndx = obj.index,
    tmpSprite = aiSprites[tmpIndx];
  if (!tmpSprite) {
    var tmpImg = new Image();
    tmpImg.onload = function () {
      this.isLoaded = !0, this.onload = null;
    }, tmpImg.src = '.././img/animals/' + obj.src + '.png', tmpSprite = tmpImg, aiSprites[tmpIndx] = tmpSprite;
  }
  if (tmpSprite.isLoaded) {
    var tmpScale = 1.2 * obj.scale * (obj.spriteMlt || 1);
    ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, 2 * tmpScale, 2 * tmpScale);
  }
}

function isOnScreen(x, y, s) {
  return x + s >= 0 && x - s <= maxScreenWidth && y + s >= 0 && y - s <= maxScreenHeight;
}

function addPlayer(data, isYou) {
  var tmpPlayer = function (id) {
    for (var i = 0; i < players.length; ++i)
      if (players[i].id == id)
        return players[i];
    return null;
  }(data[0]);
  tmpPlayer || (tmpPlayer = new Player(data[0], data[1], config, UTILS, projectileManager, objectManager, players, ais, items, hats, accessories), players.push(tmpPlayer)), tmpPlayer.spawn(isYou ? moofoll : null), tmpPlayer.visible = !1, tmpPlayer.x2 = void 0, tmpPlayer.y2 = void 0, tmpPlayer.setData(data), isYou && (camX = (player = tmpPlayer)
    .x, camY = player.y, updateItems(), updateStatusDisplay(), updateAge(), updateUpgrades(0), gameUI.style.display = 'block');
}

function removePlayer(id) {
  for (var i = 0; i < players.length; i++)
    if (players[i].id == id) {
      players.splice(i, 1);
      break;
    }
}

function updateItemCounts(index, value) {
  player && (player.itemCounts[index] = value);
}

function updatePlayerValue(index, value, updateView) {
  player && (player[index] = value, updateView && updateStatusDisplay());
}

function updateHealth(sid, value) {
  (tmpObj = findPlayerBySID(sid)) && (tmpObj.health = value);
}

function updatePlayers(data) {
  for (var tmpTime = Date.now(), i = 0; i < players.length; ++i)
    players[i].forcePos = !players[i].visible, players[i].visible = !1;
  for (i = 0; i < data.length;)
    (tmpObj = findPlayerBySID(data[i])) && (tmpObj.t1 = void 0 === tmpObj.t2 ? tmpTime : tmpObj.t2, tmpObj.t2 = tmpTime, tmpObj.x1 = tmpObj.x, tmpObj.y1 = tmpObj.y, tmpObj.x2 = data[i + 1], tmpObj.y2 = data[i + 2], tmpObj.d1 = void 0 === tmpObj.d2 ? data[i + 3] : tmpObj.d2, tmpObj.d2 = data[i + 3], tmpObj.dt = 0, tmpObj.buildIndex = data[i + 4], tmpObj.weaponIndex = data[i + 5], tmpObj.weaponVariant = data[i + 6], tmpObj.team = data[i + 7], tmpObj.isLeader = data[i + 8], tmpObj.skinIndex = data[i + 9], tmpObj.tailIndex = data[i + 10], tmpObj.iconIndex = data[i + 11], tmpObj.zIndex = data[i + 12], tmpObj.visible = !0), i += 13;
}

function findPlayerBySID(sid) {
  for (var i = 0; i < players.length; ++i)
    if (players[i].sid == sid)
      return players[i];
  return null;
}

function findAIBySID(sid) {
  for (var i = 0; i < ais.length; ++i)
    if (ais[i].sid == sid)
      return ais[i];
  return null;
}

function findObjectBySid(sid) {
  for (var i = 0; i < gameObjects.length; ++i)
    if (gameObjects[i].sid == sid)
      return gameObjects[i];
  return null;
}
var lastPing = -1;

function pingSocketResponse() {
  var pingTime = Date.now() - lastPing;
  window.pingTime = pingTime, pingDisplay.innerText = 'Ping: ' + pingTime + '\xA0ms';
}

function pingSocket() {
  lastPing = Date.now(), io.send('pp');
}

function serverShutdownNotice(countdown) {
  if (!(countdown < 0)) {
    var minutes = Math.floor(countdown / 60),
      seconds = countdown % 60;
    seconds = ('0' + seconds)
      .slice(-2), shutdownDisplay.innerText = 'Server restarting in ' + minutes + ':' + seconds, shutdownDisplay.hidden = !1;
  }
}

function openLink(link) {
  window.open(link, '_blank');
}
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  },
  function () {
    var tmpMid = config.mapScale / 2;
    objectManager.add(0, tmpMid, tmpMid + 200, 0, config.treeScales[3], 0), objectManager.add(1, tmpMid, tmpMid - 480, 0, config.treeScales[3], 0), objectManager.add(2, tmpMid + 300, tmpMid + 450, 0, config.treeScales[3], 0), objectManager.add(3, tmpMid - 950, tmpMid - 130, 0, config.treeScales[2], 0), objectManager.add(4, tmpMid - 750, tmpMid - 400, 0, config.treeScales[3], 0), objectManager.add(5, tmpMid - 700, tmpMid + 400, 0, config.treeScales[2], 0), objectManager.add(6, tmpMid + 800, tmpMid - 200, 0, config.treeScales[3], 0), objectManager.add(7, tmpMid - 260, tmpMid + 340, 0, config.bushScales[3], 1), objectManager.add(8, tmpMid + 760, tmpMid + 310, 0, config.bushScales[3], 1), objectManager.add(9, tmpMid - 800, tmpMid + 100, 0, config.bushScales[3], 1), objectManager.add(10, tmpMid - 800, tmpMid + 300, 0, items.list[4].scale, items.list[4].id, items.list[10]), objectManager.add(11, tmpMid + 650, tmpMid - 390, 0, items.list[4].scale, items.list[4].id, items.list[10]), objectManager.add(12, tmpMid - 400, tmpMid - 450, 0, config.rockScales[2], 2);
  }(),
  function e() {
    now = Date.now(), delta = now - lastUpdate, lastUpdate = now,
      function () {
        if (player && (!lastSent || now - lastSent >= 1000 / config.clientSendRate)) {
          lastSent = now;
          const attackDir = getAttackDir();
          lastAttackDir !== attackDir && (lastAttackDir = attackDir, io.send('2', attackDir));
        }
        if (deathTextScale < 120 && (deathTextScale += 0.1 * delta, diedText.style.fontSize = Math.min(Math.round(deathTextScale), 120) + 'px'), player) {
          var attackDir = UTILS.getDistance(camX, camY, player.x, player.y),
            tmpDir = UTILS.getDirection(player.x, player.y, camX, camY),
            camSpd = Math.min(0.01 * attackDir * delta, attackDir);
          attackDir > 0.05 ? (camX += camSpd * Math.cos(tmpDir), camY += camSpd * Math.sin(tmpDir)) : (camX = player.x, camY = player.y);
        } else
          camX = config.mapScale / 2, camY = config.mapScale / 2;
        for (var lastTime = now - 1000 / config.serverUpdateRate, i = 0; i < players.length + ais.length; ++i)
          if ((tmpObj = players[i] || ais[i - players.length]) && tmpObj.visible)
            if (tmpObj.forcePos)
              tmpObj.x = tmpObj.x2, tmpObj.y = tmpObj.y2, tmpObj.dir = tmpObj.d2;
            else {
              var total = tmpObj.t2 - tmpObj.t1,
                ratio = (lastTime - tmpObj.t1) / total;
              tmpObj.dt += delta;
              var tmpRate = Math.min(1.7, tmpObj.dt / 170),
                tmpDiff = tmpObj.x2 - tmpObj.x1;
              tmpObj.x = tmpObj.x1 + tmpDiff * tmpRate, tmpDiff = tmpObj.y2 - tmpObj.y1, tmpObj.y = tmpObj.y1 + tmpDiff * tmpRate, tmpObj.dir = Math.lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, ratio));
            }
        var xOffset = camX - maxScreenWidth / 2,
          yOffset = camY - maxScreenHeight / 2;
        config.snowBiomeTop - yOffset <= 0 && config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight ? (mainContext.fillStyle = '#b6db66', mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)) : config.mapScale - config.snowBiomeTop - yOffset <= 0 ? (mainContext.fillStyle = '#dbc666', mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)) : config.snowBiomeTop - yOffset >= maxScreenHeight ? (mainContext.fillStyle = '#fff', mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)) : config.snowBiomeTop - yOffset >= 0 ? (mainContext.fillStyle = '#fff', mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset), mainContext.fillStyle = '#b6db66', mainContext.fillRect(0, config.snowBiomeTop - yOffset, maxScreenWidth, maxScreenHeight - (config.snowBiomeTop - yOffset))) : (mainContext.fillStyle = '#b6db66', mainContext.fillRect(0, 0, maxScreenWidth, config.mapScale - config.snowBiomeTop - yOffset), mainContext.fillStyle = '#dbc666', mainContext.fillRect(0, config.mapScale - config.snowBiomeTop - yOffset, maxScreenWidth, maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset))), firstSetup || ((waterMult += waterPlus * config.waveSpeed * delta) >= config.waveMax ? (waterMult = config.waveMax, waterPlus = -1) : waterMult <= 1 && (waterMult = waterPlus = 1), mainContext.globalAlpha = 1, mainContext.fillStyle = '#dbc666', renderWaterBodies(xOffset, yOffset, mainContext, config.riverPadding), mainContext.fillStyle = '#91b2db', renderWaterBodies(xOffset, yOffset, mainContext, 250 * (waterMult - 1))), mainContext.lineWidth = 4, mainContext.strokeStyle = '#000', mainContext.globalAlpha = 0.06, mainContext.beginPath();
        for (var x = -camX; x < maxScreenWidth; x += maxScreenHeight / 18)
          x > 0 && (mainContext.moveTo(x, 0), mainContext.lineTo(x, maxScreenHeight));
        for (var y = -camY; y < maxScreenHeight; y += maxScreenHeight / 18)
          x > 0 && (mainContext.moveTo(0, y), mainContext.lineTo(maxScreenWidth, y));
        for (mainContext.stroke(), mainContext.globalAlpha = 1, mainContext.strokeStyle = outlineColor, renderGameObjects(-1, xOffset, yOffset), mainContext.globalAlpha = 1, mainContext.lineWidth = 5.5, renderProjectiles(0, xOffset, yOffset), renderPlayers(xOffset, yOffset, 0), mainContext.globalAlpha = 1, i = 0; i < ais.length; ++i)
          (tmpObj = ais[i])
          .active && tmpObj.visible && (tmpObj.animate(delta), mainContext.save(), mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset), mainContext.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2), renderAI(tmpObj, mainContext), mainContext.restore());
        if (renderGameObjects(0, xOffset, yOffset), renderProjectiles(1, xOffset, yOffset), renderGameObjects(1, xOffset, yOffset), renderPlayers(xOffset, yOffset, 1), renderGameObjects(2, xOffset, yOffset), renderGameObjects(3, xOffset, yOffset), mainContext.fillStyle = '#000', mainContext.globalAlpha = 0.09, xOffset <= 0 && mainContext.fillRect(0, 0, -xOffset, maxScreenHeight), config.mapScale - xOffset <= maxScreenWidth) {
          var tmpY = Math.max(0, -yOffset);
          mainContext.fillRect(config.mapScale - xOffset, tmpY, maxScreenWidth - (config.mapScale - xOffset), maxScreenHeight - tmpY);
        }
        if (yOffset <= 0 && mainContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset), config.mapScale - yOffset <= maxScreenHeight) {
          var tmpX = Math.max(0, -xOffset),
            tmpMin = 0;
          config.mapScale - xOffset <= maxScreenWidth && (tmpMin = maxScreenWidth - (config.mapScale - xOffset)), mainContext.fillRect(tmpX, config.mapScale - yOffset, maxScreenWidth - tmpX - tmpMin, maxScreenHeight - (config.mapScale - yOffset));
        }
        for (mainContext.globalAlpha = 1, mainContext.fillStyle = 'rgba(0, 0, 70, 0.35)', mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight), mainContext.strokeStyle = darkOutlineColor, i = 0; i < players.length + ais.length; ++i)
          if ((tmpObj = players[i] || ais[i - players.length])
            .visible && (10 != tmpObj.skinIndex || tmpObj == player || tmpObj.team && tmpObj.team == player.team)) {
            var tmpText = (tmpObj.team ? '[' + tmpObj.team + '] ' : '') + (tmpObj.name || '');
            if ('' != tmpText) {
              if (mainContext.font = (tmpObj.nameScale || 30) + 'px Hammersmith One', mainContext.fillStyle = '#fff', mainContext.textBaseline = 'middle', mainContext.textAlign = 'center', mainContext.lineWidth = tmpObj.nameScale ? 11 : 8, mainContext.lineJoin = 'round', mainContext.strokeText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY), mainContext.fillText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY), tmpObj.isLeader && iconSprites.crown.isLoaded) {
                var tmpS = config.crownIconScale;
                tmpX = tmpObj.x - xOffset - tmpS / 2 - mainContext.measureText(tmpText)
                  .width / 2 - config.crownPad, mainContext.drawImage(iconSprites.crown, tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS);
              }
              1 == tmpObj.iconIndex && iconSprites.skull.isLoaded && (tmpS = config.crownIconScale, tmpX = tmpObj.x - xOffset - tmpS / 2 + mainContext.measureText(tmpText)
                .width / 2 + config.crownPad, mainContext.drawImage(iconSprites.skull, tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS));
            }
            tmpObj.health > 0 && (config.healthBarWidth, mainContext.fillStyle = darkOutlineColor, mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad, tmpObj.y - yOffset + tmpObj.scale + config.nameY, 2 * config.healthBarWidth + 2 * config.healthBarPad, 17, 8), mainContext.fill(), mainContext.fillStyle = tmpObj == player || tmpObj.team && tmpObj.team == player.team ? '#8ecc51' : '#cc5151', mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth, tmpObj.y - yOffset + tmpObj.scale + config.nameY + config.healthBarPad, 2 * config.healthBarWidth * (tmpObj.health / tmpObj.maxHealth), 17 - 2 * config.healthBarPad, 7), mainContext.fill());
          }
        for (textManager.update(delta, mainContext, xOffset, yOffset), i = 0; i < players.length; ++i)
          if ((tmpObj = players[i])
            .visible && tmpObj.chatCountdown > 0) {
            tmpObj.chatCountdown -= delta, tmpObj.chatCountdown <= 0 && (tmpObj.chatCountdown = 0), mainContext.font = '32px Hammersmith One';
            var tmpSize = mainContext.measureText(tmpObj.chatMessage);
            mainContext.textBaseline = 'middle', mainContext.textAlign = 'center', tmpX = tmpObj.x - xOffset, tmpY = tmpObj.y - tmpObj.scale - yOffset - 90;
            var tmpW = tmpSize.width + 17;
            mainContext.fillStyle = 'rgba(0,0,0,0.2)', mainContext.roundRect(tmpX - tmpW / 2, tmpY - 23.5, tmpW, 47, 6), mainContext.fill(), mainContext.fillStyle = '#fff', mainContext.fillText(tmpObj.chatMessage, tmpX, tmpY);
          }!
        function (delta) {
          if (player && player.alive) {
            mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height), mapContext.strokeStyle = '#fff', mapContext.lineWidth = 4;
            for (var i = 0; i < mapPings.length; ++i)
              (tmpPing = mapPings[i])
              .update(mapContext, delta);
            if (mapContext.globalAlpha = 1, mapContext.fillStyle = '#fff', renderCircle(player.x / config.mapScale * mapDisplay.width, player.y / config.mapScale * mapDisplay.height, 7, mapContext, !0), mapContext.fillStyle = 'rgba(255,255,255,0.35)',  true && minimapData)
              for (i = 0; i < minimapData.length;)
                renderCircle(minimapData[i] / config.mapScale * mapDisplay.width, minimapData[i + 1] / config.mapScale * mapDisplay.height, 7, mapContext, !0), i += 2;
            lastDeath && (mapContext.fillStyle = '#fc5553', mapContext.font = '34px Hammersmith One', mapContext.textBaseline = 'middle', mapContext.textAlign = 'center', mapContext.fillText('x', lastDeath.x / config.mapScale * mapDisplay.width, lastDeath.y / config.mapScale * mapDisplay.height)), mapMarker && (mapContext.fillStyle = '#fff', mapContext.font = '34px Hammersmith One', mapContext.textBaseline = 'middle', mapContext.textAlign = 'center', mapContext.fillText('x', mapMarker.x / config.mapScale * mapDisplay.width, mapMarker.y / config.mapScale * mapDisplay.height));
          }
        }(delta), -1 !== controllingTouch.id && renderControl(controllingTouch.startX, controllingTouch.startY, controllingTouch.currentX, controllingTouch.currentY), -1 !== attackingTouch.id && renderControl(attackingTouch.startX, attackingTouch.startY, attackingTouch.currentX, attackingTouch.currentY);
      }(), requestAnimFrame(e);
    if (window.doUpdateVisual) window.doUpdateVisual();
  }(), window.openLink = openLink, window.aJoinReq = aJoinReq, window.follmoo = function () {
    moofoll || (moofoll = !0, saveVal('moofoll', 1));
  }, window.kickFromClan = kickFromClan, window.sendJoin = sendJoin, window.leaveAlliance = leaveAlliance, window.createAlliance = createAlliance, window.storeBuy = storeBuy, window.storeEquip = storeEquip, window.showItemInfo = showItemInfo, window.selectSkinColor = function (index) {
    skinColor = index, updateSkinColorPicker();
  }, window.changeStoreIndex = function (index) {
    currentStoreIndex != index && (currentStoreIndex = index, generateStoreList());
  }, window.config = config;
})();

/******/ })()
;