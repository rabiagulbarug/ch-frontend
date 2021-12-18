import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

export const CompanyDetailScreen = () => {
    const params = useParams();
    const [company, setCompany] = useState(undefined);
    const user = useSelector(state => state.auth?.user);
    const token = useSelector(state => state.auth?.token);
    const [jobs, setJobs] = useState([]);

    const [title, setTitle] = useState("");
    const [requirement, setRequirement] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState("");

    const loadPosts = () => fetch(`http://localhost:3002/post/${params.id}`)
        .then(res => res.json())
        .then(res => setJobs(res.posts));

    useEffect(() => {
        fetch(`http://localhost:3002/company/${params.id}`)
            .then(res => res.json())
            .then(res => setCompany(res.company));
        loadPosts();
    }, []);

    const onSubmit = useCallback((event) => {
        event.preventDefault();
        fetch(`http://localhost:3002/post/${params.id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                requirement,
                position,
                description,
                perks
            })
        }).then(res => res.json()).finally(() => {
            loadPosts();
            setTitle('');
            setRequirement('');
            setPosition('');
            setDescription('');
            setPerks('');
        });
    }, [user, title, requirement, position, description, perks]);

    return (
        <div className="row mx-0">
            <div className="col-md-4 col-12">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            {company?.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img src={company?.avatar ?? '/no-image.png'} />
                        <div className="row mx-0">
                            <label htmlFor="title" className="col-lg-3 col-12">Title</label>
                            <div className="col-lg-9 col-12">
                                <input className="form-control" readOnly defaultValue={company?.title}/>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="location" className="col-lg-3 col-12">Location</label>
                            <div className="col-lg-9 col-12">
                                <input className="form-control" readOnly defaultValue={company?.location}/>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="category" className="col-lg-3 col-12">Category</label>
                            <div className="col-lg-9 col-12">
                                <input className="form-control" readOnly defaultValue={company?.category}/>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="location" className="col-lg-3 col-12">Description</label>
                            <div className="col-12">
                                <p>{company?.description}</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-8 col-12">
                {jobs.map(job => (
                    <Card key={job._id} className="mb-4">
                        <Card.Header>
                            <Card.Title as={Link} to={`/company/${company?._id}/job/${job?._id}`}>{job.title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <strong>Position:</strong>
                            <span>{job.position}</span>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {user?._id === company?.userId && (
                <div className="row mx-0 my-5">
                    <div className="col-12 p-0">
                        <Card>
                            <Card.Header>
                                <Card.Title>Create Job Post</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <form onSubmit={onSubmit}>
                                    <label className="row mx-0 mb-2">
                                        <span className="col-md-3 col-12">Title</span>
                                        <div className="col-md-9 col-12">
                                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} defaultValue={title} />
                                        </div>
                                    </label>

                                    <label className="row mx-0 mb-2">
                                        <span className="col-md-3 col-12">Position</span>
                                        <div className="col-md-9 col-12">
                                            <input type="text" className="form-control" onChange={e => setPosition(e.target.value)} defaultValue={position} />
                                        </div>
                                    </label>

                                    <label className="row mx-0 mb-2">
                                        <span className="col-md-3 col-12">Requirement</span>
                                        <div className="col-md-9 col-12">
                                            <textarea className="form-control" onChange={e => setRequirement(e.target.value)} defaultValue={requirement} />
                                        </div>
                                    </label>

                                    <label className="row mx-0 mb-2">
                                        <span className="col-md-3 col-12">Description</span>
                                        <div className="col-md-9 col-12">
                                            <textarea className="form-control" onChange={e => setDescription(e.target.value)} defaultValue={description} />
                                        </div>
                                    </label>

                                    <label className="row mx-0 mb-2">
                                        <span className="col-md-3 col-12">Perks</span>
                                        <div className="col-md-9 col-12">
                                            <textarea className="form-control" onChange={e => setPerks(e.target.value)} defaultValue={perks} />
                                        </div>
                                    </label>

                                    <Button variant="success" type="submit">Create Job Post</Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}