const path = require('path')



module.exports = {
  //indexPath: 'index.php',

  lintOnSave: false,
  css: {
    loaderOptions: {
     
      sass:{
        prependData: `@import "~@/styles/variables/common.sass"; @import "~@/styles/mixins/common.sass";`
      }
    }
  }

}