export function getBase64ImageFromURL(url:string){
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = async () => {
          var canvas = await document.createElement("canvas");
          canvas.width = await img.width;
          canvas.height = await img.height;
          var ctx:any = await canvas.getContext("2d");
          await ctx.drawImage(img, 0, 0);
          var dataURL = await canvas.toDataURL("image/png");
          await resolve(dataURL);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = url;
    });
}