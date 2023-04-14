function funcHoisting() {
    var myHoistingVar1 = 'myHoistingVar1';
    console.log(myHoistingVar1);

    if (true) {
        var myHoistingVar1 = '変更！';
        console.log(myHoistingVar1);  // 変更
    }
    console.log(myHoistingVar1); // 変更
}



funcHoisting();