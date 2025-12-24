import React from "react";
import InputField from "./InputField";
import { registerUser } from "../services/register";

export default function RegistrationForm() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(null); // for general errors
    const [errors, setErrors] = React.useState({}); // for field errors
    const [courses, setCourses] = React.useState([]);
    const [selectedCourse, setSelectedCourse] = React.useState(null);

    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/api/courses/")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(err => console.log("Ошибка при загрузке курсов:", err));
    }, []);

    const [formData, setFormData] = React.useState({
        student_name: "",
        email: "",
        phone: "",
        course: ""
    });

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


    function handleChange(event) {
        const {name, value } = event.target;
        // update form data
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validateField(name, value)
        }));

        if(name === "course") {
            const course = courses.find(c => c.id === Number(value));
            setSelectedCourse(course || null);
        }
}

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setErrors({});
        setSuccess(false);

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key]);
            if (err) newErrors[key] = err;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await registerUser(formData);
            setSuccess(true);
        } catch (error) {
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