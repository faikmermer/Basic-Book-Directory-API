

const http = require('http');
const fs = require('fs');

var uniqueId = 0;
//Var olan veriler var ise  ve uniqueId 0 ise son 
//id'i bulur bir fazlasını atarız yeni verimize
function higherId(arr) {
    let higher = -1;
    for (i = 0; i < arr.length; ++i)  if (arr[i].id > higher) higher = arr[i].id;
    
    return ++higher;
}
const server = http.createServer((req, res) => {


    if (req.method === 'POST' && req.url === '/Books') {

        let body = '';
        //Gelen yeni veri binary olarak gelip toString ile çeviririz.
        req.on('data', buff => {

            body += buff.toString();
        });
        req.on('end', () => {

            //Verimizi JSON formattan obje formatına çeviririz.
            const newData = JSON.parse(body);

            fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {

                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error reading file' }));
                }
                //JSON dosyası içindeki verileri objeye çevirir.
                let book = JSON.parse(data);

                if (book.length !== 0 && uniqueId === 0) { //higherId ile ıd atamasını yaparız.

                    newData['id'] = higherId(book);

                } else newData['id'] = ++uniqueId;
                //Yeni verimizi atarız.
                book.push(newData); 

                fs.writeFile(__dirname + '/books.json', JSON.stringify(book, null, 4), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ message: 'Error writing file' }))
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newData));
                });

            });

        });

    } else if (req.method === 'GET' && req.url === '/Books') {

        fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Dosya okunamadı' }));
            }
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(data);
        })
    } else if (req.method === 'GET' && req.url.indexOf('/Books/') === 0) {

        // adresimizdeki id numarasını alırız.
        const bookID = parseInt(req.url.split('/')[2]);

        fs.readFile(__dirname + '/Books.json', 'utf8', (err, data) => {

            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Dosya okunamadi' }));
            }
            //eşleşen ıd ile verimizi getiririz.
            let book = JSON.parse(data)
            let findbook = book.find(obj => obj.id === bookID); 

            if (findbook === undefined) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Book not found' }));
            } else {
                console.log(findbook);
                res.end(JSON.stringify(findbook));
            }     
        });

    } else if (req.method === 'PUT' && req.url.indexOf('/Books/') === 0) {

        const bookID = parseInt(req.url.split('/')[2]);
        let body = '';

        req.on('data', buff => {
            body += buff.toString();
        });

        req.on('end', () => {
            //istenilen ıd ile yeni verimize id ataması yaparız.
            let updateBook = JSON.parse(body);
            updateBook['id'] = bookID;

            fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {

                if (err) return console.error(500, 'Error reading file');
                //istenilen ıd'nin index numarasını bulup yeni verimizi atarız.
                let books = JSON.parse(data);
                let index = books.findIndex(obj => obj.id === bookID);
                //eğer find() metodu id bulumazsa böyle bir veri olmadığı için güncelleme yapamaz.
                if (index != - 1) {
                    books[index] = updateBook

                    fs.writeFile(__dirname + '/books.json', JSON.stringify(books, null, 2), (err) => {
                        if (err) return console.error(500, 'Error writing file');

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(updateBook, { message: 'Add a Book' }));
                    })
                } else console.error(404, 'Book not found ');
            });
        });
    } else if (req.method === 'DELETE' && req.url.indexOf(/Books/) === 0) {

        const bookId = parseInt(req.url.split('/')[2]);
        fs.readFile(__dirname + '/books.json', 'utf8', (err, data) => {
            //Json içindeki veriyi objeye çevirdik.
            data = JSON.parse(data);
            //silmek istediğimiz verinin id numarasının index numarasını buluyoruz.
            let dataFindIndex = data.findIndex(obj => obj.id === bookId);

            if (dataFindIndex !== -1) {

                delete data[dataFindIndex];
                data = data.filter(i => i !== null); //sildikten sonra null olan verileri siliyoruz.

                fs.writeFile(__dirname + '/books.json', JSON.stringify(data, null, 2), (err) => {

                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing file' }));
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Book deleted successfully' }));
                })
            } else {
                console.error(404, 'the book is not available')
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'the book is not available' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "This page can't be displayed" }));
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Sunucu http://localhost${PORT} calisiyor...`);
});