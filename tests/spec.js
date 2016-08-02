// spec.js
describe('Test the circle regeneration button', function() {
    browser.get('http://localhost:8080/');
    
    var totalCircles = browser.findElement(by.id('total-circles'));
    var regenButton = browser.findElement(by.id('regen-circles'));
    
    it('Should be disabled if text is in an input' ,function() {
        totalCircles.clear().then(
            function(){
                totalCircles.sendKeys('abc');
            });
        
        expect(regenButton.isEnabled()).toBe(false);
    });

    it('Should add 5000 circles', function() {
        
        totalCircles.clear().then(
            function(){
                totalCircles.sendKeys('5000');
            });

        regenButton.click();
        var circles = element.all(by.css('circle'));
        expect(circles.count()).toEqual(5000);
    });
});

