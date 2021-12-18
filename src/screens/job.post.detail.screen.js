import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card} from "react-bootstrap";

export const JobPostDetailScreen = () => {
    const params = useParams();
    const [job, setJob] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3002/post/${params.companyId}/${params.jobId}`)
            .then(res => res.json())
            .then(res => setJob(res.post));
    }, []);

    return (
        <div className="row mx-0">
            <div className="col-12">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            {job?.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="row mx-0">
                            <label htmlFor="position" className="col-md-3 col-12"><strong>Position</strong></label>
                            <div className="col-md-9 col-12">
                                <input className="form-control" readOnly defaultValue={job?.position}/>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="requirement" className="col-md-3 col-12"><strong>Requirement</strong></label>
                            <div className="col-12">
                                <p>{job?.requirement}</p>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="description" className="col-md-3 col-12"><strong>Description</strong></label>
                            <div className="col-12">
                                <p>{job?.description}</p>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <label htmlFor="perks" className="col-md-3 col-12"><strong>Perks</strong></label>
                            <div className="col-12">
                                <p>{job?.perks}</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}