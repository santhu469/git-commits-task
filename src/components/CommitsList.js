import React from 'react';
import moment from 'moment';
import '../App.css';

const CommitsList = ({ commits }) => {
    if (commits.length === 0) {
        return <div>No commits to display</div>
    }
    return (
        <>
        {commits.map(commit => (<div key={commit.author.date} className="commit-container">
            <h3>{commit.commit.message}</h3>
            <p>{moment(commit.commit.author.date).format("MMM Do YY, h:mm a")} by {commit.commit.author.name}</p>
        </div>))}
        </>
    )
}

export default CommitsList
