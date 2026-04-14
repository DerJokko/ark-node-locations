# ARK Fjordur Rune Checklist

A comprehensive, interactive checklist for collecting all runes in the ARK: Survival Evolved Fjordur map. This static website helps players track their progress across all regions, caves, and realms.

## Features

- **Complete Rune Coverage**: All surface runes, cave entrances, and realm locations from the Fjordur map.
- **Interactive Checkboxes**: Mark runes as collected with persistent local storage.
- **Progress Tracking**: Global and per-section progress counters.
- **Detailed Descriptions**: In-depth notes for each location, including preparation requirements and tips.
- **Visual Aids**: Embedded images and screenshots for tricky locations.
- **Export/Import Progress**: Save and load your checklist state as JSON.
- **Section Controls**: Check/uncheck all runes in a region with one click.
- **Responsive Design**: Works on desktop and mobile browsers.

## Usage

1. Browse sections by region.
2. Check off runes as you collect them.
3. Use "Check All" or "Uncheck All" for global control.
4. Export your progress to save/load across devices.

### Controls

- **Checkboxes**: Mark individual runes.
- **Section Buttons**: Toggle all runes in a region.
- **Export Progress**: Download your checklist as a JSON file.
- **Import Progress**: Upload a saved JSON to restore state.

## Data Structure

Coordinates for a Map are stored in `name.json` with the following element types:
- `description`: Detailed explanatory text.
- `picture`: Images. Use `left_picture` and `right_picture` for images with text wrapping around.
- `coord`: Rune coordinates with optional description.
- `entrance`: Cave entrance markers.
- `note`: Additional tips and warnings for a coord (indented text).
- `hint`: Additional showcase for a coord (indented image).

## Contributing

Feel free to submit issues or pull requests for:
- Missing runes or incorrect coordinates.
- Additional descriptions or images.
- UI improvements or bug fixes.
- Other Maps (just send me a working .json!)

## Credits

Based on the original Steam guide by [Steam User](https://steamcommunity.com/sharedfiles/filedetails/?id=3104481630).
Also Credit to AI for helping me lol (Thats the only non AI line in this README)

## License

This project is open-source. Use and modify as needed.
