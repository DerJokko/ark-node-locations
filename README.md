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

1. Open `index.html` in your web browser.
2. Browse sections by region (Vannaland, Balheimr, etc.).
3. Check off runes as you collect them.
4. Use "Check All" or "Uncheck All" for global control.
5. Export your progress to save/load across devices.

### Controls

- **Checkboxes**: Mark individual runes.
- **Section Buttons**: Toggle all runes in a region.
- **Export Progress**: Download your checklist as a JSON file.
- **Import Progress**: Upload a saved JSON to restore state.

## Hosting on GitHub Pages

This static site is optimized for GitHub Pages deployment:

1. Push this repository to GitHub (make it public).
2. Go to your repository Settings > Pages.
3. Under "Source", select "Deploy from a branch".
4. Choose the `main` branch (or create a `gh-pages` branch if preferred).
5. The site will be live at `https://yourusername.github.io/repository-name/`.

All files are in the root directory, so no additional configuration is needed. Progress data is stored locally in the browser, so it works offline once loaded.

## Data Structure

Runes are stored in `runes.json` with the following element types:
- `coord`: Rune coordinates with optional descriptions and images.
- `entrance`: Cave entrance markers.
- `note`: Additional tips and warnings.
- `description`: Detailed explanatory text.
- `picture`: Embedded images.

## Contributing

Feel free to submit issues or pull requests for:
- Missing runes or incorrect coordinates.
- Additional descriptions or images.
- UI improvements or bug fixes.

## Credits

Based on the original Steam guide by [Steam User](https://steamcommunity.com/sharedfiles/filedetails/?id=3104481630).
Also Credit to AI for helping me lol (Thats the only non AI line in this README)

## License

This project is open-source. Use and modify as needed.
