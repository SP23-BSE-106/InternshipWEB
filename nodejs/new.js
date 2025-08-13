const fs=  require('fs');
console.log('Creating new file...');
//  fs.writeFileSync("munaza.txt","This is a new file created using Node.js.");
console.log('File created successfully!');
fs.writeFile("munzi.txt", "This is a new file created using Node.js.", (err) => {
    if (err) {
        console.error('Error creating file:', err);
    } else {
        console.log('File created successfully!');
    }
    fs.readFile("munzi.txt", "utf8", (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('File content:', data);
        }
    });
});
console.log('This is the end of the file creation process.');
fs.appendFile("munzi.txt", " This is the appended text.", (err) => {
    if (err) {
        console.error('Error appending to file:', err);
    } else {
        console.log('Text appended successfully!');
    }
});