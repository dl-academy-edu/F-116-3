// if (location.search) {
//     // создаем объект для будущих параметров
//     const params = {};
  
//     // создаем массив строк-параметров ["phoneId=apple", "phoneId=xiaomi", "howShow=10"]
//     const arrayStringParams = location.search.substring(1).split("&");
  
//     // пробегаемся по массиву, созданному выше
//     for (let stringParam of arrayStringParams) {
//       let param = stringParam.split("="); // создаем массив значений параметра ["phoneId", "apple"]
//       let nameParam = param[0]; // имя параметра
//       let valueParam = param[1]; // значение параметра
//       // проверка - если имя параметра уже существует в объекте параметров, тогда добавляй в массив значение параметра, иначе создай свойсво внутри объекта параметров, создай в нем массив и положи в него значение параметра {phoneId: Array(2), howShow: Array(1)}
//       if (nameParam in params) {
//         params[nameParam].push(valueParam);
//       } else {
//         params[nameParam] = [valueParam];
//       }
//     }
  
//     // ищем форму фильтрации
//     const filterForm = document.forms.filterForm;
  
//     // создаем функцию, которая проходится по елементам формы и исходя из данных хранящихся в объекте с параметрами, делает или не делает их активными
//     const updateInput = (gInputs, typeParam) => {
//       for (let input of gInputs) {
//         const param = params[typeParam];
//         if (!param) return;
//         for (partParam of param) {
//           if (partParam === input.value) {
//             input.checked = true;
//           }
//         }
//       }
//     };
  
//     updateInput(filterForm.modelPhone, "phoneId");
//     updateInput(filterForm.howShow, "howShow");
//   }
  
//   const url = new URL(location.pathname, location.origin);

//   // вешаем слушатель на форму, который будет обновлять значения параметров с location
//   filterForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     url.searchParams.delete('howShow');
//     url.searchParams.delete('modelPhone');

  
//     const addCheckedInput = (nameGroupInput, typeParam) => {
//       for (checkbox of nameGroupInput) {
//         if (checkbox.checked) {
//           url.searchParams.append(typeParam, checkbox.value);
//         }
//       }
//     };
  
//     addCheckedInput(e.target.modelPhone, "phoneId");
//     addCheckedInput(e.target.howShow, "howShow");
  
//     history.replaceState(null, '', url);
// });

const obj = {
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "The breed of my new dog is Pug.",
            "text": "The pug is a breed of dog with physically distinctive features of a wrinkly, short-muzzled face, and curled tail.",
            "commentsCount": 76,
            "date": "2020-09-08T11:37:42.026Z",
            "views": 1767,
            "photo": {
                "desktopPhotoUrl": "/public/images/Blog1.jpg",
                "desktop2xPhotoUrl": "/public/images/Blog12@.jpg",
                "tabletPhotoUrl": "/public/images/Blog1-tablet.jpg",
                "tablet2xPhotoUrl": "/public/images/Blog1-tablet@2.jpg",
                "mobilePhotoUrl": "/public/images/Blog1-mobile.jpg",
                "mobile2xPhotoUrl": "/public/images/Blog1-mobile@2.jpg"
            },
            "tags": [
                {
                    "id": 1,
                    "name": "Option 1",
                    "color": "#2176FF"
                },
                {
                    "id": 2,
                    "name": "Option 2",
                    "color": "#33A1FD"
                },
                {
                    "id": 3,
                    "name": "Option 3",
                    "color": "#FDCA40"
                },
                {
                    "id": 4,
                    "name": "Option 4",
                    "color": "#57E2E5"
                }
            ]
        },
]};

let jsonFromServer = JSON.stringify(obj);

let jsonFromServerInObj = JSON.parse(jsonFromServer);
console.log(jsonFromServerInObj.data[0].commentsCount);

let userValue = prompt();