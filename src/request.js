export default class Request{
   static call(options){
       var defaultOptions = {
           status : 200,
           method : 'GET',
           url : "",
           headers : {},
           data : null
       };
      options = Object.assign(defaultOptions,options);
     return new Promise((resolve, reject) => {
           var request = new XMLHttpRequest();
           request.onreadystatechange = function () {
               if (this.readyState == XMLHttpRequest.DONE && this.status == options.status) {
                   resolve(JSON.parse(this.responseText));
               } else if (this.readyState == XMLHttpRequest.DONE && this.status != options.status) {
                   reject(this.responseText);
               }
           };
           request.open(options.method, options.url );
          for(var [key,value] of Object.entries(options.headers)){
              request.setRequestHeader(key,value);
          }
          if(options.data == null){
              request.send();
          }else{
              request.send(options.data);
          }
       });
   };
};
