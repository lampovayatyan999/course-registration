import React from "react";
import InputField from "./InputField";
import { registerUser } from "../services/register";

export default function RegistrationForm() {
    const [loading, setLoading] = React.useState(false); // for loading state
    const [success, setSuccess] = React.useState(false); // for successful registration
    const [error, setError] = React.useState(null); // for general errors
    const [errors, setErrors] = React.useState({}); // for field errors
    const [courses, setCourses] = React.useState([]); // for courses list
    const [selectedCourse, setSelectedCourse] = React.useState(null); // for selected course

    // Fetch courses from the API when the component renders firstly
    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/api/courses/")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(err => console.log("Ошибка при загрузке курсов:", err));
    }, []);

    // Form data state
    const [formData, setFormData] = React.useState({
        student_name: "",
        email: "",
        phone: "",
        course: ""
    });

    // Field validation function
    const validateField = (name, value) => {
        switch(name) {
            case "student_name":
                if (!value.trim()) return "ФИО обязательно";
                else return "";
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return "Email обязателен";
                else if (!emailRegex.test(value)) return "Неверный формат email";
                else return "";
            case "phone":
                const phoneRegex = /^\+?\d{10,15}$/;
                if (!value.trim()) return "Телефон обязателен";
                else if (!phoneRegex.test(value)) return "Неверный формат телефона";
                else return "";
            default:
                return "";
        }
    }

    // Handle input changes
    function handleChange(event) {
        const {name, value } = event.target;
        // update form data
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // real-time validation
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validateField(name, value)
        }));

        // if a course is selected, find the course object
        if(name === "course") {
            const course = courses.find(c => c.id === Number(value));
            setSelectedCourse(course || null);
        }
}

    // submitting the form
    async function handleSubmit(event) {
        event.preventDefault();

        // reset states
        setLoading(true);
        setError(null);
        setErrors({});
        setSuccess(false);

        // validate all fields before submission
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key]);
            if (err) newErrors[key] = err;
        });

        // if there are validation errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            // backend request
            await registerUser(formData);
            setSuccess(true);
        } catch (error) {
            // if backend returns field errors
            if (typeof error === 'object') {
                setErrors(error);
            }
            setError(error);
        } finally {
            setLoading(false);
        }
    }



    return (
    <div>
        <div className="registration-form">
            <h2>Регистрация на курс</h2>

            <form onSubmit={handleSubmit}>
                <InputField
                    label="ФИО"
                    name="student_name"
                    value={formData.student_name}
                    onChange={handleChange}
                    placeholder="Введите ваше полное имя"
                    error={errors.student_name}
                />

                <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите ваш email"
                    error={errors.email}
                />

                <InputField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Введите ваш телефон"
                    error={errors.phone}
                />

                {/* Selected course card */}
                <div className="form-group">
                    <label>Course</label>
                    <select className="select-course" name="course" value={formData.course} onChange={handleChange} >
                        <option value="">Выберите курс</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {error && <div className="error-message">Ошибка: {error.message || JSON.stringify(error)}</div>}
                {success && <div className="success-message">Регистрация прошла успешно!</div>}

                <button type="submit" disabled={loading}>
                    {loading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>

        {/* Selected course card */}
        <div>
            {selectedCourse && (
                <div className="course-card">
                    <img src={selectedCourse.image_url} alt={selectedCourse.name} />
                    <h3>{selectedCourse.name}</h3>
                    <p>{selectedCourse.description}</p>
                    <p>Цена: {selectedCourse.price}₸</p>
                </div>
            )}

        </div>
    </div>
    );
}