

const ShellBackcolor =
{
	Default: 49,
	Black: 40,
	Red: 41,
	Green: 42,
	Yellow: 43,
	Blue: 44,
	Magenta: 45,
	Cyan: 46,
	LightGray: 47,
	DarkGray: 100,
	LightRed: 101,
	LightGreen: 102,
	LightYellow: 103,
	LightBlue: 104,
	LightMagenta: 105,
	LightCyan: 106,
	White: 107,
};


const ShellForecolor =
{
	Default: 39,
	Black: 30,
	Red: 31,
	Green: 32,
	Yellow: 33,
	Blue: 34,
	Magenta: 35,
	Cyan: 36,
	LightGray: 37,
	DarkGray: 90,
	LightRed: 91,
	LightGreen: 92,
	LightYellow: 93,
	LightBlue: 94,
	LightMagenta: 95,
	LightCyan: 96,
	White: 97,
};


const ShellEffect =
{
	UnsetAll: 0,
	Bold: 1,
	Dim: 2,
	Underlined: 4,
	Blink: 5,
	Invert: 7,
	Hidden: 8,
	UnsetBold: 21,
	UnsetDim: 22,
	UnsetUnderlined: 24,
	UnsetBlink: 25,
	UnsetInvert: 27,
	UnsetHidden: 28,
};


function ShellText( Text, Backcolor, Forecolor, Effect )
{
	if ( !Backcolor && !Forecolor && !Effect ) { return Text; }
	let formatted = '\x1B[';
	if ( Backcolor ) { formatted += Backcolor + ';'; }
	if ( Forecolor ) { formatted += Forecolor + ';'; }
	if ( Effect ) { formatted += Effect + ';'; }
	formatted = formatted.substr( 0, formatted.length - 1 ) + 'm';
	formatted += Text;
	formatted += `\x1B[${ShellEffect.UnsetAll}m`;
	return formatted;
}


exports.ShellBackcolor = ShellBackcolor;
exports.ShellForecolor = ShellForecolor;
exports.ShellEffect = ShellEffect;
exports.ShellText = ShellText;

