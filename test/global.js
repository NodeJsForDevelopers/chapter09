'use strict';

after(function(done) {
    require('../src/config/mongoose.js').then(
        (mongoose) => mongoose.disconnect(done));
});
