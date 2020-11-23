const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert-${type}" alert-dismissible role="alert">${msg} 
    <button class="close" type="button" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    </div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
}

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
}


const editFarmerOne = async (phoneNumber, activities, id) => {
    try {
        const response = await axios({
            method: 'PATCH',
            url: `http://localhost:8080/farmer-one/${id}`,
            data: {
                phoneNumber,
                activities
            }
        })
        if (response.data.message === "successfully updated FO details") {
            showAlert('success', "FO Details successfully updated");
            window.setTimeout(() => {
                location.assign(`/farmer-one/${id}`);
            }, 4000);
        }
    } catch (error) {
        showAlert('danger', error.response.data.message);
    }
}

var form = document.querySelector('.fo-profile-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page from reloading
        var phoneNumber = document.getElementById('phoneNumber').value;
        var activities = document.getElementById('activities').value;
        var id = document.getElementById('id').value;

        editFarmerOne(phoneNumber, activities, id); // call this to assign ward to farmer-one
    })
}