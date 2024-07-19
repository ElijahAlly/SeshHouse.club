"use strict";
const fetchAllUsers = async () => {
    const resContCode = document.getElementById('user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
    document.getElementById('user-res-cont').style.display = 'block';
    document.getElementById('clear-user-btn').textContent = 'clear';
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimeout(() => {
            document.getElementById('user-res-cont-code').textContent = JSON.stringify(data, null, 2);
        }, 300);
    }
    catch (error) {
        console.error('Error fetching API data:', error);
        resContCode.textContent = 'Error fetching API data: ' + error;
        resContCode.classList.add('bg-red-500', 'text-slate-100');
    }
};
const clearUser = async () => {
    setTimeout(() => {
        document.getElementById('user-res-cont').style.display = 'none';
        document.getElementById('clear-user-btn').textContent = '';
    }, 300);
    const resContCode = document.getElementById('user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
};
const updateSingleUser = async () => {
    const resContCode = document.getElementById('update-single-user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
    document.getElementById('update-single-user-res-cont').style.display = 'block';
    document.getElementById('clear-update-single-user-btn').textContent = 'clear';
    try {
        const query = document.getElementById('get-update-single-user-btn').textContent;
        const response = await fetch(`/api${query?.split(' ')[1]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimeout(() => {
            document.getElementById('update-single-user-res-cont-code').textContent = JSON.stringify(data, null, 2);
        }, 300);
    }
    catch (error) {
        console.error('Error fetching API data:', error);
        resContCode.textContent = 'Error fetching API data: ' + error;
        resContCode.classList.add('bg-red-500', 'text-slate-100');
    }
};
const fetchSingleUser = async () => {
    const exactSearchCheckbox = document.getElementById('users-exact-search-checkbox');
    const resContCode = document.getElementById('single-user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
    document.getElementById('single-user-res-cont').style.display = 'block';
    document.getElementById('clear-single-user-btn').textContent = 'clear';
    try {
        const query = document.getElementById('get-single-user-btn').textContent;
        console.log(exactSearchCheckbox.checked);
        const exactSearchQuery = exactSearchCheckbox.checked ? '&exact_match=true' : '';
        const response = await fetch(`/api${query?.split(' ')[1]}${exactSearchQuery}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimeout(() => {
            document.getElementById('single-user-res-cont-code').textContent = JSON.stringify(data, null, 2);
        }, 300);
    }
    catch (error) {
        console.error('Error fetching API data:', error);
        resContCode.textContent = 'Error fetching API data: ' + error;
        resContCode.classList.add('bg-red-500', 'text-slate-100');
    }
};
const clearSingleUser = async () => {
    setTimeout(() => {
        document.getElementById('single-user-res-cont').style.display = 'none';
        document.getElementById('clear-single-user-btn').textContent = '';
    }, 300);
    const resContCode = document.getElementById('single-user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
};
const clearUpdateSingleUser = async () => {
    setTimeout(() => {
        document.getElementById('update-single-user-res-cont').style.display = 'none';
        document.getElementById('clear-update-single-user-btn').textContent = '';
    }, 300);
    const resContCode = document.getElementById('update-single-user-res-cont-code');
    resContCode.textContent = '';
    resContCode.classList.remove('bg-red-500', 'text-slate-100');
};
const updateQueryString = (formattedLabel, value, isUpdating) => {
    const getSingleUserBtn = document.getElementById(`get-${isUpdating ? 'update-' : ''}single-user-btn`);
    const newQueryParam = `${formattedLabel}=${value}`;
    let currentText = getSingleUserBtn.textContent;
    // Check if the parameter already exists
    const regex = new RegExp(`([?&])${formattedLabel}=[^&]*`);
    if (currentText.includes(`${formattedLabel}=`)) {
        // Replace existing parameter
        currentText = currentText.replace(regex, `$1${newQueryParam}`);
    }
    else {
        // Append new parameter
        if (currentText.includes('?')) {
            currentText += `&${newQueryParam}`;
        }
        else {
            currentText += `?${newQueryParam}`;
        }
    }
    getSingleUserBtn.textContent = currentText;
};
const removeQueryString = (formattedLabel, isUpdating) => {
    const getSingleUserBtn = document.getElementById(`get-${isUpdating ? 'update- ' : ''}single-user-btn`);
    const regex = new RegExp(`([?&])${formattedLabel}=[^&]*`, 'i');
    let currentText = getSingleUserBtn.textContent;
    // Remove the parameter
    currentText = currentText.replace(regex, (match, p1) => p1 === '?' ? '?' : '');
    // Clean up any extraneous '&' or '?'
    if (currentText.endsWith('?') || currentText.endsWith('&')) {
        currentText = currentText.slice(0, -1);
    }
    // Ensure there are no '??' or '&&' sequences
    currentText = currentText.replace('?&', '?');
    currentText = currentText.replace('&&', '&');
    getSingleUserBtn.textContent = currentText;
};
// Function to create an input field with a trash icon
const createFieldElement = (label, isUpdating) => {
    const formattedLabel = label.toLowerCase().replace(' ', '_');
    const container = document.createElement('div');
    container.className = 'flex mb-2';
    const containerLeft = document.createElement('div');
    containerLeft.className = 'flex flex-col mb-2';
    const inputLabel = document.createElement('label');
    inputLabel.className = 'block text-sm font-medium text-gray-700 required';
    inputLabel.textContent = label;
    const input = document.createElement('input');
    input.className = `${isUpdating ? 'update-' : ''}single-user-input mt-1 h-6 px-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`;
    input.type = 'text';
    input.name = formattedLabel;
    input.id = `${label.toLowerCase().replace(' ', '-')}-input`;
    const getUserTextInitial = document.getElementById(`get-${isUpdating ? 'update-' : ''}single-user-text`);
    for (let i = 0; i < userFields.length; i++) {
        const field = userFields[i];
        if (getUserTextInitial.innerHTML.includes(field)) {
            getUserTextInitial.innerHTML = `${getUserTextInitial.innerHTML} &`;
            break;
        }
    }
    getUserTextInitial.innerHTML = getUserTextInitial.innerHTML + ` ${label}`;
    updateQueryString(formattedLabel, input.value, isUpdating);
    const getSingleUserBtn = document.getElementById(`get-${isUpdating ? 'update-' : ''}single-user-btn`);
    getSingleUserBtn.disabled = false;
    getSingleUserBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
    getSingleUserBtn.classList.add('bg-red-500', 'hover:bg-red-500');
    input.onchange = (e) => {
        const inputFields = document.getElementsByClassName(`${isUpdating ? 'update-' : ''}single-user-input`);
        const target = e.target;
        updateQueryString(formattedLabel, target.value, isUpdating);
        const allFieldsFilled = Array.from(inputFields).every(input => input.value.trim().length > 0);
        if (target.value.length > 0 && allFieldsFilled) {
            getSingleUserBtn.disabled = false;
            getSingleUserBtn.classList.remove('bg-red-500', 'hover:bg-red-500');
            if (!getSingleUserBtn.classList.contains('bg-green-600'))
                getSingleUserBtn.classList.add('bg-green-600', 'hover:bg-green-500');
        }
        else {
            getSingleUserBtn.disabled = true;
            getSingleUserBtn.classList.add('bg-red-500', 'hover:bg-red-500');
            getSingleUserBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
        }
    };
    const removeButton = document.createElement('button');
    removeButton.className = 'w-fit h-fit mt-1 ml-4 inline-flex px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500';
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
        removeQueryString(formattedLabel, isUpdating);
        const getSingleUserText = document.getElementById(`get-${isUpdating ? 'update-' : ''}single-user-text`);
        getSingleUserText.innerHTML = getSingleUserText.innerHTML.replace(`&amp; ${label}`, '').replace(` ${label}`, '');
        const singleUserText = getSingleUserText.innerHTML;
        const splitArr = singleUserText.split('&amp;');
        if (splitArr.length > 1 && !userFields.some(field => splitArr[0].includes(field))) {
            getSingleUserText.innerHTML = singleUserText.replace('&amp;', '').trim();
        }
        const selectedFields = document.getElementById(`${isUpdating ? 'update-' : ''}selected-fields`);
        selectedFields.removeChild(container);
        const dropdownItem = document.createElement('button');
        dropdownItem.className = `${isUpdating ? 'update-' : ''}single-user-dropdown-item w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300`;
        dropdownItem.textContent = label;
        dropdownItem.onclick = () => {
            document.getElementById(`${isUpdating ? 'update-' : ''}single-user-dropdown-menu`).classList.add('hidden');
            createFieldElement(label, isUpdating);
            dropdownItem.remove();
        };
        document.querySelector(`#${isUpdating ? 'update-' : ''}single-user-dropdown-menu > .py-1`).appendChild(dropdownItem);
        if (selectedFields.childElementCount === 0) {
            const getSingleUserBtn = document.getElementById(`get-${isUpdating ? 'update-' : ''}single-user-btn`);
            getSingleUserBtn.disabled = false;
            getSingleUserBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
            if (!getSingleUserBtn.classList.contains('bg-red-500'))
                getSingleUserBtn.classList.add('bg-red-500', 'hover:bg-red-500');
        }
        else {
            const inputFields = document.getElementsByTagName('input');
            const allFieldsFilled = Array.from(inputFields).every(input => input.value.trim().length > 0);
            if (allFieldsFilled) {
                getSingleUserBtn.disabled = false;
                getSingleUserBtn.classList.remove('bg-red-500', 'hover:bg-red-500');
                if (!getSingleUserBtn.classList.contains('bg-green-600'))
                    getSingleUserBtn.classList.add('bg-green-600', 'hover:bg-green-500');
            }
            else {
                getSingleUserBtn.disabled = true;
                getSingleUserBtn.classList.add('bg-red-500', 'hover:bg-red-500');
                getSingleUserBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
            }
        }
    };
    containerLeft.appendChild(inputLabel);
    containerLeft.appendChild(input);
    container.appendChild(containerLeft);
    container.appendChild(removeButton);
    document.getElementById(`${isUpdating ? 'update- ' : ''}selected-fields`).appendChild(container);
};
const toggleUserDropdown = () => {
    const dropdownMenu = document.getElementById('single-user-dropdown-menu');
    dropdownMenu.classList.toggle('hidden');
};
const toggleUpdateUserDropdown = () => {
    const dropdownMenu = document.getElementById('update-single-user-dropdown-menu');
    dropdownMenu.classList.toggle('hidden');
};
const userFields = [
    'Id',
    'First Name',
    'Last Name',
    'Username',
    'Phone Number',
    'Email'
];
// Fetch all users
window.addEventListener('DOMContentLoaded', () => {
    const getUserButton = document.getElementById('get-user');
    const getUserResCont = document.getElementById('user-res-cont');
    const getClearUserButton = document.getElementById('clear-user-btn');
    if (getUserResCont) {
        document.getElementById('user-res-cont').style.display = 'none';
    }
    if (getUserButton) {
        getUserButton.onclick = () => fetchAllUsers();
    }
    if (getClearUserButton) {
        getClearUserButton.onclick = () => clearUser();
    }
});
// Fetch single user
window.addEventListener('DOMContentLoaded', () => {
    const userContDropdownButton = document.getElementById('dropdown-button-user-cont');
    const pingContDropdownButton = document.getElementById('dropdown-button-ping-cont');
    const getClearUpdateUserButton = document.getElementById('clear-update-single-user-btn');
    const getClearUserButton = document.getElementById('clear-single-user-btn');
    const userDropdownButton = document.getElementById('single-user-dropdown-button');
    const updateUserDropdownButton = document.getElementById('update-single-user-dropdown-button');
    const getUserResCont = document.getElementById('single-user-res-cont');
    const getUpdateUserResCont = document.getElementById('update-single-user-res-cont');
    const getSingleUserButton = document.getElementById('get-single-user-btn');
    const getUpdateSingleUserIdInput = document.getElementById('update-user-id-input');
    getSingleUserButton.disabled = true;
    getSingleUserButton.onclick = () => {
        if (getSingleUserButton.disabled)
            return;
        fetchSingleUser();
    };
    if (getUserResCont) {
        document.getElementById('single-user-res-cont').style.display = 'none';
    }
    if (getUpdateUserResCont) {
        document.getElementById('update-single-user-res-cont').style.display = 'none';
    }
    if (getClearUserButton) {
        getClearUserButton.onclick = () => clearSingleUser();
    }
    if (getClearUpdateUserButton) {
        getClearUpdateUserButton.onclick = () => clearUpdateSingleUser();
    }
    getUpdateSingleUserIdInput.onchange = (e) => {
        const target = e.target;
        document.getElementById('get-update-single-user-btn').value = target.value;
    };
    const userDropdownItems = document.querySelectorAll('.single-user-dropdown-item');
    userDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleUserDropdown();
            createFieldElement(item.textContent || '', false);
            item.remove();
        });
    });
    const updateUserdropdownItems = document.querySelectorAll('.update-single-user-dropdown-item');
    updateUserdropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleUpdateUserDropdown();
            createFieldElement(item.textContent || '', true);
            item.remove();
        });
    });
    userDropdownButton.onclick = () => {
        toggleUserDropdown();
    };
    updateUserDropdownButton.onclick = () => {
        toggleUpdateUserDropdown();
    };
    userContDropdownButton.onclick = () => {
        const dropdownMenu = document.getElementById('dropdown-user-cont');
        dropdownMenu.classList.toggle('hidden');
        if (dropdownMenu.classList.contains('hidden')) {
            Array.from(userContDropdownButton.children)[0].innerHTML = '&#8595;';
        }
        else {
            Array.from(userContDropdownButton.children)[0].innerHTML = '&#8593;';
        }
    };
    pingContDropdownButton.onclick = () => {
        const dropdownMenu = document.getElementById('dropdown-ping-cont');
        dropdownMenu.classList.toggle('hidden');
        if (dropdownMenu.classList.contains('hidden')) {
            Array.from(pingContDropdownButton.children)[0].innerHTML = '&#8595;';
        }
        else {
            Array.from(pingContDropdownButton.children)[0].innerHTML = '&#8593;';
        }
    };
    // Handle click outside of dropdown
    document.onclick = (e) => {
        if (!e.target)
            return;
        const elementClicked = e.target;
        if (elementClicked.classList.contains('single-user-dropdown-item') || elementClicked.classList.contains('update-single-user-dropdown-item'))
            return;
        if ((elementClicked.id !== 'single-user-dropdown-button' && !document.getElementById('single-user-dropdown-menu').classList.contains('hidden'))) {
            toggleUserDropdown();
        }
        if ((elementClicked.id !== 'update-single-user-dropdown-button' && !document.getElementById('update-single-user-dropdown-menu').classList.contains('hidden'))) {
            toggleUpdateUserDropdown();
        }
    };
});
//# sourceMappingURL=fetchUser.js.map