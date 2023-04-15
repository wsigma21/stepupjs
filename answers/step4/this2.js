const objArrow = {
    name: 'これはobjArrowです',
    test: function() {
        console.log('testの中です');
        console.log(this); // {name: 'これはobjArrowです', test: ƒ}

        // arrow関数を定義したスコープのthis（test関数のthis）が所有者として扱われる
        // thisが指すオブジェクトは、objArrow
        const arrow = () => {
            console.log('arrowの中です');
            console.log(this); // {name: 'これはobjArrowです', test: ƒ}
            console.log(this === objArrow); // true
        };
        
        // test関数のthisとは無関係に所有者オブジェクト不在と扱われる
        // thisが指すオブジェクトは、window
        const normal = function() {
            console.log('normalの中です');
            console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
            console.log(this === objArrow); // false
        }

        arrow();
        normal();
    }
};

console.log(objArrow); // {name: 'これはobjArrowです', test: ƒ}
objArrow.test();
