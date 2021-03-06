'use strict';
const core = require('../lib/index');
const fs = require('fs');
const sinon = require('sinon');
const dummy = require('./sinonObjects/writeDirectory.dummy');


test('writeDirectory', (done) => {
    const stub = sinon.stub(fs, 'mkdirSync').callsFake(() => {
        return true;
    });

    const promise = core.WriteDirectory('front_modules', 'petter');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        done();
        stub.restore();
    });
});

test('WriteFile', () => {

    const stub = sinon.stub(fs, 'writeFileSync').callsFake(() => {
       return true;
    });

    const promise = core.WriteFile(dummy.templateHTML,'text/html', 'html');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        stub.restore();
    });
});

test('ReplaceString', () => {
    expect(core.ReplaceString(dummy.templateHTML, '<name>', 'testFunction')).toBe(dummy.templateHTML);
});

test('fsExistsSync', () => {
    const stub = sinon.stub(fs, 'accessSync').callsFake(() => {
       return true;
    });

    const promise = core.fsExistsSync('test');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        stub.restore();
    })
});

test('ReadFile', (done) => {
    const stub = sinon.stub(fs, 'readFileSync').callsFake(() => {
        return dummy.templateHTML;
    });

    const promise = core.ReadFile('templateHTML', 'testFile');

    expect.assertions(1);

    return promise.then(data => {
        expect(data).toEqual(dummy.templateHTML);
        done();
        stub.restore();
    });
});

test('ReadAllFiles', () => {
    const stub = sinon.stub(core, 'ReadFile').callsFake(() => {
        stub.withArgs('templateHTML', name).returns(templateHTML);
        stub.withArgs('templateCSS', name).returns(templateCSS);
        stub.withArgs('templateJS', name).returns(templateJS);
        stub.withArgs('templateTEST', name).returns(templateTEST);
        stub.withArgs('templateSINON', name).returns(templateSINON);
    });

    expect(core.ReadAllFiles(name)).toEqual([templateHTML, templateCSS, templateJS,templateTEST ,templateSINON]);
});





test('CreateDirectory' ,() => {

    const stubReadAllFiles = sinon.stub(core, 'ReadAllFiles').callsFake(() => {
        return [templateHTML, templateCSS, templateJS, templateTEST, templateSINON];

    });

    const stubWriteDirectories = sinon.stub(core, 'WriteDirectories').callsFake((done) => {
        return promise.then(data => {
            expect(data).toBe(true);
            done();

        });
    });

    const stubCreateFiles = sinon.stub(core, 'CreateFiles').callsFake((done) => {

        return promise.then(data => {
            expect(data).toBe(true);
        });
            done();
        stubCreateFiles.restore();
        stubReadAllFiles.restore();
        stubWriteDirectories.restore();
    });

    expect(core.CreateDirectory('argv')).toBe(true);

});