if (typeof (localStorage) == 'undefined') {
  console.log('您的浏览器不支持localStorage，采用UserData进行模拟封装。')

  //设定对象  
  var box = document.body || document.getElementsByTagName("head")[0] || document.documentElement;

  userdataobj = document.createElement('input');

  userdataobj.type = "hidden";

  userdataobj.addBehavior("#default#userData");

  box.appendChild(userdataobj);

  //封装localStorage
  var localStorage = {
    //模拟 setItem
    setItem: function (nam, val) {
      userdataobj.load(nam);  //打开文件 
      userdataobj.setAttribute(nam, val);  //为指定属性赋值
      var d = new Date();
      d.setDate(d.getDate() + 700);

      userdataobj.expires = d.toUTCString();
      console.log(userdataobj.expires)
      userdataobj.save(nam);

      userdataobj.load("userdata_record");

      var dt = userdataobj.getAttribute("userdata_record");

      if (dt == null) dt = '';

      dt = dt + nam + ",";

      userdataobj.setAttribute("userdata_record", dt);

      userdataobj.save("userdata_record");
    },


    //模拟 getItem
    getItem: function (nam) {

      userdataobj.load(nam);

      return userdataobj.getAttribute(nam);
    },


    //模拟 removeItem
    removeItem: function (nam) {

      userdataobj.load(nam);

      clear_userdata(nam)

      userdataobj.load("userdata_record");

      var dt = userdataobj.getAttribute("userdata_record");

      var reg = new RegExp(nam + ",", "g");

      dt = dt.replace(reg, '');

      var d = new Date();

      d.setDate(d.getDate() + 700);

      userdataobj.expires = d.toUTCString();

      userdataobj.setAttribute("userdata_record", dt);

      userdataobj.save("userdata_record");

    },


    //模拟 clear();
    clear: function () {

      userdataobj.load("userdata_record");

      var dt = userdataobj.getAttribute("userdata_record").split(",");

      for (var i in dt)

      {
        if (dt[i] != '') clear_userdata(dt[i])
      }

      clear_userdata("userdata_record")

    }
  }


  //将名字为keyname的变量消除
  function clear_userdata(keyname) {
    var keyname;

    var d = new Date();

    d.setDate(d.getDate() - 1);

    userdataobj.load(keyname);

    userdataobj.expires = d.toUTCString();

    userdataobj.save(keyname);

  }

}


