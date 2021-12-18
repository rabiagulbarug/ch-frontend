import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";

export const CompanyCreateScreen = () => {
    const history = useHistory();
    const [title, setTitle] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [location, setLocation] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [avatar, setAvatar] = useState(undefined);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.token) {
            history.push('/auth/login');
        }
    }, [auth.token, history])

    const createCompany = useCallback(() => {
        fetch('http://localhost:3002/company', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                location,
                category,
                avatar,
            })
        }).then(res => res.json()).then(res => {
            history.push(`/company-detail/${res.company._id}`);
        });
    }, [auth, avatar, category, location, description, title]);

    const onSubmit = (event) => {
        event.preventDefault();
        createCompany();
    };

    const setBase64Avatar = (event) => {
        if (event?.target?.files) {
            const reader = new FileReader();
            if (event.target.files.length) {
                reader.readAsDataURL(event.target.files[0]);
            } else {
                setAvatar(undefined);
            }
            reader.onload = () => {
                setAvatar(reader.result);
            }
            reader.onerror = () => {
                setAvatar(undefined);
            }
        } else {
            setAvatar(undefined);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                <span>Title</span>
                <input type="text" defaultValue={title} onChange={e => setTitle(e.target.value)}/>
            </label>
            <label>
                <span>Category</span>
                <input type="text" defaultValue={category} onChange={e => setCategory(e.target.value)}/>
            </label>
            <label>
                <span>Location</span>
                <input type="text" defaultValue={location} onChange={e => setLocation(e.target.value)}/>
            </label>
            <label>
                <span>Description</span>
                <textarea defaultValue={description} onChange={e => setDescription(e.target.value)}/>
            </label>
            <label>
                <span>Avatar</span>
                <input type="file" accept="image/*" onChange={e => setBase64Avatar(e)}/>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}