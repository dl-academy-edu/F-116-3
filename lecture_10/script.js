(async function() {
    const SERVER_URL = 'https://academy.directlinedev.com';
    const LIMIT = 9;
    const mainLoader = document.querySelector('.main-loader_js');
    const filterForm = document.forms.filter;
    let loaderCount = 0;
    const showLoader = () => {
        loaderCount++;
        mainLoader.classList.remove('hidden');
    }

    const hideLoader = () => {
        loaderCount--;
        if (loaderCount <= 0) {
            mainLoader.classList.add('hidden');
            loaderCount = 0;
        }
    }

    showLoader();
    sendRequest({url: '/api/tags', method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(async res => {
        const tags = await res.json();
        const tagsBox = document.querySelector('.select-of-box_js');
        console.log(tags.data);
        tags.data.forEach(tag => {
            const tagHTML = createTag(tag);
            tagsBox.insertAdjacentHTML('beforeend', tagHTML);
        })
        let params = getParamsFromLocation();
        setDataToFilter(params);
        getData(params);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        hideLoader();
    })

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let data = {};

        if (filterForm.elements.name.value) data.name = filterForm.elements.name;
        data.tags = [...filterForm.elements.tags]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
        data.sortBy = ([...filterForm.elements.sortBy]
        .find(radio => radio.checked) || {value:null}).value;

        getData(data);
        setSearchParams(data);
    })


    function getData(data) {
        const result = document.querySelector('.result_js');
        result.innerHTML = '';
        let searchParams = new URLSearchParams();
        searchParams.set('v', '1.0.0');

        if (data.tags && Array.isArray(data.tags) && data.tags.length) {
            searchParams.set('tags', JSON.stringify(data.tags));
        }

        let filter = {};
        if (data.name) {
            filter.title = data.name.value;
        }
        
        searchParams.set('filter', JSON.stringify(filter));

        searchParams.set('limit', LIMIT);

        if (data.sortBy) {
            searchParams.set('sort', JSON.stringify([data.sortBy, 'ASC']));
        }

        showLoader();
        sendRequest({url: '/api/posts?' + searchParams.toString(), headers: {'Content-Type': 'application/json'}})
        .then(async (res) => {
            const posts = await res.json();
            let dataPosts = '';
            posts.data.forEach(post => {
                dataPosts += cardCreate({
                    title: post.title,
                    text: post.text,
                    src: post.photo.desktopPhotoUrl,
                    tags: post.tags,
                })
            })
            result.insertAdjacentHTML('beforeend', dataPosts);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            hideLoader();
        })
    }

    function cardCreate({title, text, src, tags}) {
        return `<div class="col-4 mb-3"><div class="card">
                    <img src="${SERVER_URL}${src}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text"></p>${text}</p>
                        ${tags.map(tag => `<span style="color: ${tag.color}">${tag.name}</span>`).join('<br>')}
                    </div>
                </div></div>`
    }

    function getParamsFromLocation() {
        let searchParams = new URLSearchParams(location.search);
        return {
            name: searchParams.get('name') || '',
            tags: searchParams.getAll('tags'),
            sortBy: searchParams.get('sortBy')
        }
    }

    function setDataToFilter(data) {
        const form = document.forms.filter;
        form.elements.name.value = data.name;
        form.elements.tags.forEach(checkbox => {
            checkbox.checked = data.tags.includes(checkbox.value);
        })
        form.elements.sortBy.forEach(radio => {
            radio.checked = data.sortBy === radio.value;
        })
    }

    function setSearchParams(data) {
        let searchParams = new URLSearchParams();
        if (data.name) {
            searchParams.set('name', data.name.value);
        }
        data.tags.forEach(tag => {
            searchParams.append('tags', tag);
        })
        if (data.sortBy) {
            searchParams.set('sortBy', data.sortBy);
        }
        history.replaceState(null, document.title, '?' + searchParams.toString());
    }

    function createTag({id, name, color}) {
        return `
        <div class="form-group form-check">
            <input name="tags" type="checkbox" class="form-check-input" id="tags-${id}" value="${id}">
            <label style="color: ${color}" class="form-check-label" for="tags-${id}">${name}</label>
        </div>
        `
    }

    
    function sendRequest({url, method = 'GET', headers, body = null}) {
        return fetch(SERVER_URL + url, {
            method, 
            headers,
            body
        })
    }
})();
