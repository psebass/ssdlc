import React from 'react';

export default function VideoCard({ title, channel, date, url, thumbnail }) {
  return (
    <a href={url} target="_blank" className="video-card-custom">
      <div className="video-thumbnail-container">
        <img src={thumbnail} alt={title} />
        <div className="play-button-overlay">
          <div className="play-triangle"></div>
        </div>
      </div>
      <div className="video-info-custom">
        <h4>{title}</h4>
        <div className="channel-info">
          <div className="channel-icon">{channel[0]}</div>
          <div>
            <strong>{channel}</strong><br/>
            <span>YouTube • {date}</span>
          </div>
        </div>
      </div>
    </a>
  );
}