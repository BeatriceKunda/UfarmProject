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


const assignWard = async (ward, id) => {
    try {
        const response = await axios({
            method: 'PATCH',
            url: `http://localhost:8080/farmer-one/${id}/assign-ward`,
            data: {
                ward
            }
        })
        if (response.data.message === "successfully assigned ward") {
            showAlert('success', "Ward Successfully Assigned");
            window.setTimeout(() => {
                location.assign(`/farmer-one/${id}`);
            }, 4000);
        }
    } catch (error) {
        console.log("Failure")
        showAlert('danger', error.response.data.message);
    }
}

var form = document.querySelector('.assign-ward-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page from reloading
        var ward = document.getElementById('ward').value;
        var id = document.getElementById('id').value;

        assignWard(ward, id); // call this to assign ward to farmer-one
    })
}