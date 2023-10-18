import React, { useEffect, useState } from 'react';
import { addDoc,collection,getDocs,query,updateDoc,doc,deleteDoc } from 'firebase/firestore';
import { db } from './Firebase/Firebase';
function Hero() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [students, setStudents] = useState([]);
    const [editingStudentId, setEditingStudentId] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        const student = { name, email, age: parseInt(age), gender, city };

        if (editingStudentId) {
            try {
                await updateDoc(doc(db, "students", editingStudentId), student);
                setEditingStudentId(null);
            } catch (error) {
                console.error("Error updating student:", error);
            }
        } else {
            try {
                await addDoc(collection(db, "students"), student);
            } catch (error) {
                console.error("Error adding student:", error);
            }
        }

        setName('');
        setEmail('');
        setAge('');
        setGender('');
        setCity('');
        getStudents();
    }

    const getStudents = async () => {
        const q = query(collection(db, "students"));

        try {
            const querySnapshot = await getDocs(q);
            let studentList = [];
            querySnapshot.forEach((doc) => {
                studentList.push({ ...doc.data(), id: doc.id });
            });
            setStudents(studentList);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    }

    const deleteStudent = async (id) => {
        try {
            await deleteDoc(doc(db, "students", id));
            getStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    }

    const editStudent = (student) => {
        setName(student.name);
        setEmail(student.email);
        setAge(student.age);
        setGender(student.gender);
        setCity(student.city);
        setEditingStudentId(student.id);
    }

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className="">
            <div className="bg-blue-900 text-white  p-4 shadow-lg">
                <h1 className="text-center text-4xl">CRUD OPERATION USING REACT AND FIREBASE</h1>
            </div>

            <div className="flex flex-col items-center mt-10">
                <form onSubmit={submit} className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold">Name:</label>
                        <input type="text" id="name" value={name} className="border-2 border-gray-300 p-2 rounded-lg w-full" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold">Email:</label>
                        <input type="email" id="email" value={email} className="border-2 border-gray-300 p-2 rounded-lg w-full" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block font-semibold">Age:</label>
                        <input type="number" id="age" value={age < 0  ? 0 : age } className="border-2 border-gray-300 p-2 rounded-lg w-full" onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Gender:</label>
                        <div className="flex space-x-4">
                            <label>
                                <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} className="mr-2" />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} className="mr-2" />
                                Female
                            </label>
                            <label>
                                <input type="radio" name="gender" value="other" checked={gender === "other"} onChange={() => setGender("other")} className="mr-2" />
                                Other
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block font-semibold">City:</label>
                        <input type="text" id="city" value={city} className="border-2 border-gray-300 p-2 rounded-lg w-full" onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <button type="submit" className="bg-blue-900 text-white p-2 rounded-lg w-full">{editingStudentId ? "Update" : "Add"}</button>
                </form>
            </div>
            <div className="bg-blue-900 text-white  p-2 mt-4 shadow-lg">
                <h1 className="text-center text-4xl">Details</h1>
            </div>
            <div className="overflow-auto">
                <table className="w-full   bg-white rounded-lg shadow-md overflow-x-scroll" cellPadding={10}>
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Age</th>
                            <th className="py-2">Gender</th>
                            <th className="py-2">City</th>
                            <th className="py-2">Edit</th>
                            <th className="py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="text-center">
                                <td className="py-2">{student.name}</td>
                                <td className="py-2">{student.email}</td>
                                <td className="py-2">{student.age}</td>
                                <td className="py-2">{student.gender}</td>
                                <td className="py-2">{student.city}</td>
                                <td className="py-2">
                                    <button onClick={() => editStudent(student)} className="bg-blue-900 text-white p-2 px-4 rounded-lg">Edit</button>
                                </td>
                                <td className="py-2">
                                    <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white p-2 rounded-lg ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Hero;