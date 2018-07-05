state = {
	"allPagesData": [
        {
            "main": {
                "actionManager": {
                    "anctionsList": []
                },
                "animationManager": {
                    "animationList": []
                },
                "children": [
                    // {},
                    // {},
                    // {}
                    // 舞台里对象都在这里
                ],
                "isMounted": true,
                "_id": 0,
                "_name": undefined,
                "_parent": null,
                "_rectangle": {
                    // ...
                },
                "_stage": {
                    // ...
                },
                "_texture": {
                    "_content": "舞台",
                    "_style": {
                        "backgroundColor": "#ffffff",
                        "backgroundImage": "",
                        "backgroundSize": "cover",
                        // ...
                    },
                    "_type": -1,
                    // ...
                },
                "_transform": {
                    // ...
                },
                "_type": 2,
                "_visible": true,
                // ...
            },
            "resource": {
                "list": [
                    {
                        ext: 'jpg',
                        host: "http://xesfile.xesimg.com/courseware_pages",
                        id: 3,
                        name: "_15156534806504",
                        src: "./d38241d78860230222f85e773b28080c/static/_15156534806504.jpg"
                    },
                    // ...
                ],
                "version": "0.0.1",
                "_RA": true,
            }
        }
    ], //课件所有页面数据
    "currentPageIndex": 0, //多页面时当前页的索引值，默认是0即第一页
    "currentTabRIndex": 0,//右侧导航当前tab的index值
    "fontSize": 0, //rem缩放的字体大小
    "stageData": {// 当前页舞台数据
        "children":[
            // 文本
            {
                "children":[],
                "isMounted": true,
                "id": 1,// 在舞台中的序号
                "name": "文本",
                "parent": {
                    "actionManager": {
                        "anctionsList": []
                    },
                    "animationManager": {
                        "animationList": []
                    },
                    "children": [
                        {
                            "children": [],
                            "isMounted": true,
                            "_id": 1,
                            "_name": "文本",
                            "_parent": {},
                            "_rectangle": {},
                            "_stage": {},
                            "_texture": {},
                            "_transform": {}
                        }
                    ],
                    "isMounted": true,
                    "_id": 0,
                    "_name": undefined,
                    "_parent": null,
                    "_rectangle": {
                        "height": 1440,
                        "name": "polygon",
                        "width": 1920,
                        "x": 0,
                        "y": 0,
                        "plane": 720
                    },
                    "_stage": {
                        "actionManager": {
                            "anctionsList": []
                        },
                        "animationManager": {
                            "animationList": []
                        },
                        "children": [
                            {
                                "children": [],
                                "isMounted": true,
                                "_id": 1,
                                "name": "文本",
                                "_parent": {},
                                "_rectangle": {},
                                "_stage":{},
                                "_texture": {},
                                "_type": 0,
                                "_visible": true,
                                "id": 1,
                                // ...
                            },
                            // ...
                        ],
                        "isMounted": true,
                        "_id":0,
                        "name": undefined,
                        "_parent": null,
                        "_rectangle": {
                            "height": 1440,
                            "name": "polygon",
                            "width": 1920,
                            "x": 0,
                            "y": 0,
                            "plane": 720
                        },
                        "_stage": {},
                        "_texture": {},
                        "_transform": {},
                        "_type": 2,
                        "_visible": true,
                        // ...
                    },
                    "_texture": {
                        "_content": "舞台",
                        "_style":{
                            "backgroundColor": "#ffffff",
                            "backgroundImage": "",
                            "backgroundSize": "cover",
                            // ...
                        },
                        "_type": -1
                    },
                    "_transform": {
                        "localTransform": {},
                        "pivot": {},
                        "position": {},
                        "scale": {},
                        "skew": {},
                        "worldTransform": {},
                        "_currentLocalID":1,
                        //...
                    },
                    "_type": 2,
                    "_visible": true,
                    // ...
                },
                "rectangle": {},
                "stage":{},
                "texture":{},
                "transform":{},
                "type":0,// 文本、图片、视频、音频都是0，舞台是-1。
                "visible":true,
                // 下面还有好多方法。
            }
            // 图片
            {
                "children": [],
                "isMounted": true,
                "_id": 2,
                "_name": "图片",
                "_parent": {
                    // ...
                },
                "_rectangle": {
                    // ...
                },
                "_stage": {
                    // ...
                },
                "_texture": {
                    "_content": 0,
                    "_style": {
                        "backgroundColor": "rgba(0,0,0,0)",
                        "borderColor": "rgba(0,0,0,0)",
                        "borderRadius": 0,
                        "borderStyle": "none",
                        "borderWidth": 0
                    },
                    "_type": 1,
                    // ...
                },
                "_transform": {
                    // ...
                },
                "_type": 0,
                "_visible": true,
                // ...
            }
            // 音频
            {
               "children": [],
               "isMounted": true,
               "_id": 6,
               "_name": "音频",
               "_parent": {
                    // ...
               },
               "_rectangle": {
                    "height": 200,
                    "name": "polygon",
                    "width": 800,
                    "x": 119.71758664955071,
                    "y": 100,
                    // ...
               },
               "_stage": {
                    // ...
               },
               "_texture": {
                    "_content": 2,
                    "_style": {
                        "backgroundColor": "rgba(0,0,0,0)",
                        "borderColor": "rgba(0,0,0,0)",
                        "borderRadius": 0,
                        "borderStyle": "none",
                        "borderWidth": 0
                    },
                    "_type": 2,
                    // ...
               },
               "_transform": {
                    // ...
               },
               "_type": 0,
               "_visible": true,
               // ... 
            }
            // 视频
            {
                "children": [],
                "isMounted": true,
                "_id": 5,
                "_name": "视频",
                "_parent": {
                    // ...
                },
                "_rectangle": {
                    "height": 200,
                    "name": "polygon",
                    "width": 800,
                    "x": 100,
                    "y": 100,
                    "plane": 200,
                    "point": [
                        { x: 100, y: 100, name: "point" },
                        { x: 900, y: 100, name: "point" },
                        { x: 900, y: 300, name: "point" },
                        { x: 100, y: 300, name: "point" }
                    ],
                    "vertical": 500,
                    // ...
                },
                "_stage": {
                    // ...
                },
                "_texture": {
                    "_content": 1,
                    "_style": {
                        "backgroundColor": "rgba(0,0,0,0)",
                        "borderColor": "rgba(0,0,0,0)",
                        "borderRadius": 0,
                        "borderStyle": "none",
                        "borderWidth": 0
                    },
                    "_type": 3,
                    // ...
                },
                "_transform": {
                    // ...
                },
                "_type": 0,
                _visible: true,
                // ...
            }
        ]
    },
    "isMounted": true,// 待了解
    "animationManager": {},// 待了解
    "actionManager": {},// 待了解
    "id": 0,// 应该是stage的id是0，舞台上的元素的id从1开始累加。
    "name": undefined,// 待了解
    "parent": null,// 待了解
    "rectangle": {}// 待了解
    "root": undefined,// 待了解
    "stage": {},// 待了解
    "texture": {
        "style": {
            "backgroundColor": "#ffffff",
            "backgroundImage": "",// 空：没有背景图片，0：有背景图片
            "backgroundSize": "cover"// cover: ， 100% 100%
        },
        "content": "舞台",
        "style": -1,//-1：舞台
        "get _content": function () {},
        "get _content": function () {newVal},
        "get _style": function () {},
        "get _style": function () {newVal},
        "get _type": function () {},
        "get _type": function () {newVal}
    },
    "toStyle": {},// 待了解
    "transform": {},// 待了解
    "type": "Stage",// 待了解
    "visible": true// 待了解
    },
    "resourceData": { //当前页资源数据
    "list": [
        // 关于图片的信息
        {
            "ext": "jpg",
            "host": "http://xesfile.xesimg.com/courseware_pages",
            "id": "0",//序号
            "name": "_15156387723796"
            "src": "./8b6054ad1c046ea94bf3e260a0e966c3/static/_15156387723796.jpg"
        }
        // ...
    ],
    "version": "0.0.1",
    "_RA": true
    },
    "childrenData": [],//当前页所有元素数组集合数据
    "resourceId": '',//上传资源时的资源id
    "headerImgLayer": false, //头部点击图片状态
    "animationData":null,
    "actionData":null,
    "dataBox":null,// 这里放的都是方法。看样子是对舞台操作的方法。
    "selectedComponents":{
        "SAT": {},// 我发现这里是各种几何方法
        "selectType": -1,// 我发现当选中舞台时是-1，当选中图片、文本时是0。可能是来自舞台元素的type属性
        "selectorList": [],// 被选中元素组成的数组
        "stage": {},// 舞台
        "_rectangle": null// 图片、文本是就有这个东西。
    },//被选中的组件
    "selectedArea":null
}






state = {
    "commit": function boundCommit () {
        // ...
    },// 待了解
    "dispatch": function boundDispatch( ) {
        // ...
    },// 待了解
    "getters": {
        "ALL_PAGES_DATA": [],
        "CURRENT_PAGES_INDEX": 0,
        "CURRENT_TABR_INDEX": 0,
        "FONT_SIZE": 40.625,
        "HEADERIMG_LAYER": false,
        "RESOURCE_DATA": {},
        "RESOURCE_ID": "",
        "STAGE_DATA": {}
    },
    "strict": false,
    "_actionSubscribers": [],
    "_actions": {
        "ADD_ALLPAGES_DATA": [ƒ],
        "ADD_CHILDREN": [ƒ],
        "ADD_SELECT_COMPONENTS": [ƒ],
        "ALL_SELECT_COMPONENTS": [ƒ],
        "CHANGE_ALLPAGES_DATA": [ƒ],
        "CHILDREN_DATA": [ƒ],
        "CURRENT_PAGES_INDEX": [ƒ],
        "CURRENT_TABR_INDEX": [ƒ],
        "DELETE_COMPONENTS": [ƒ],
        "EDITOR_INIT": [ƒ],
        "EVENT_DISPATCHER": [ƒ],
        "GOTOBOTTOM": [ƒ],
        "GOTONEXT": [ƒ],
        "GOTOPRE": [ƒ],
        "GOTOTOP": [ƒ],
        "HEADERIMG_LAYER": [ƒ],
        "INIT": [ƒ],
        "MODIFY_CURRENT": [ƒ],
        "MOVE": [ƒ],
        "RESIZE": [ƒ],
        "RESOURCE_DATA": [ƒ],
        "RESOURCE_ID": [ƒ],
        "SELECT_COMPONENT": [ƒ],
        "STAGE_DATA": [ƒ],
    },
    "_committing": false,
    "_modules": {
        "root": {
            "context": {},
            "runtime": false,
            "state": {},
            "_children": {},
            "_rawModule": {},
            "namespaced": false
        }
    },
    "_modulesNamespaceMap": {},
    "_mutations": {
        "ADD_ALLPAGES_DATA": [ƒ],
        "ADD_CHILDREN": [ƒ],
        "ADD_SELECT_COMPONENTS": [ƒ],
        "ALL_SELECT_COMPONENTS": [ƒ],
        "CHANGE_ALLPAGES_DATA": [ƒ],
        "CHILDREN_DATA": [ƒ],
        "CURRENT_PAGES_INDEX": [ƒ],
        "CURRENT_TABR_INDEX": [ƒ],
        "DELETE_COMPONENTS": [ƒ],
        "EDITOR_INIT": [ƒ],
        "EVENT_DISPATCHER": [ƒ],
        "GOTOBOTTOM": [ƒ],
        "GOTONEXT": [ƒ],
        "GOTOPRE": [ƒ],
        "GOTOTOP": [ƒ],
        "HEADERIMG_LAYER": [ƒ],
        "INIT": [ƒ],
        "MODIFY_CURRENT": [ƒ],
        "MOVE": [ƒ],
        "RESIZE": [ƒ],
        "RESOURCE_DATA": [ƒ],
        "RESOURCE_ID": [ƒ],
        "SELECT_COMPONENT": [ƒ],
        "STAGE_DATA": [ƒ],
    },
    "_subscribers": [],
    "_vm": {},
    "_watcherVM": {},
    "_wrappedGetters": {}
}












// text image audio video
params = {
  "type": 'text',
  "data": {
    "visible" = true;
    "rectangle" = [100, 100, 800, 200];
    "transform" = [1,0,0,1,0,0];
    "children" = [];
    "texture" = {
      "opacity": 1,
      "style": {
        "borderStyle": "none",
        "borderColor": "rgba(0, 0, 0, 0)",
        "borderWidth": 0,
        "borderRadius": 0,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "textDecoration": 'none'
        "fontWeight": 'normal'
        "fontStyle": 'normal'
        "textAlign": 'center'
        "lineHeight": '6'
        "fontSize": 36
        "fontFamily": 'SimSun'
        "color": 'rgba(0, 0, 0, 1)'
      },
      "content" = '文本编辑',
      "type" = 1
    },
    "edit" = {
      "layer": {
        "lock": false,
        "hide": false
      },
      "control": {
        "permission": [1, 1, 1, 1]
      }
    },
    "name" = '图片',
    "type" = 0
  },
  "file": {
    "data": {
      "filePath": "path",//"path"
      "resourceId": "resourceId",//"resourceId" 我发现每个上传的图片都是一样的
    },
    "status": 100
  }
}

{
  "list": [
    // 关于图片的信息
    {
      "ext": "jpg",
      "host": "http://xesfile.xesimg.com/courseware_pages",
      "id": "0",//序号
      "name": "_15156387723796"
      "src": "./8b6054ad1c046ea94bf3e260a0e966c3/static/_15156387723796.jpg"
    }
  ],
  "version": "0.0.1",
  "_RA": true
}


"file": {
  "filePath": "http://xesfile.xesimg.com/courseware_pages/8b6054ad1c046ea94bf3e260a0e966c3/static/_15156422744647.jpg",
  "resourceId": "8b6054ad1c046ea94bf3e260a0e966c3",
  "status": 100
}

params = {
    "visible": true;
    "rectangle": [100, 100, 800, 200];
    "transform": [1,0,0,1,0,0];
    "children": [];
    "texture": {
      "opacity": 1,
      "style": {
        "borderStyle": "none",
        "borderColor": "rgba(0, 0, 0, 0)",
        "borderWidth": 0,
        "borderRadius": 0,
        "backgroundColor": "rgba(0, 0, 0, 0)",
      }
    },
    "edit": {
      "layer": {
        "lock": false,
        "hide": false
      },
      "control": {
        "permission": [1, 1, 1, 1]
      }
    }
    "type": 'video',
    "data": {
        "name": "视频",
        "type": 0,
        "texture": {
            "type": 3
        }
    },
    "file": {
        "data": {
                "filePath":"http://testmv.xesimg.com/courseware_pages/e962a95ed10bab66174754ee3a7a0ff1/static/_1515646287617.mp4",
                "resourceId":"e962a95ed10bab66174754ee3a7a0ff1"
            }, //上传成功就是
            //"上传失败，单个文件不能超过1M"//上传失败的描述
        "status": 1006//失败的状态码 100：成功， 1006：（至少）是错误的一种

    }
}