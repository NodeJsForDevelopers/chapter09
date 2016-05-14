'use strict';

before(function(done) {
    require('../src/config/redis.js').flushdbAsync().then(() => done());
});

after(function(done) {
    require('../src/config/redis.js').quit();
    require('../src/config/mongoose.js').then(
        (mongoose) => mongoose.disconnect(done));
});
