import { useState } from 'react';
import './Sermons.css';
import { extractText, formatDate } from '../utils/text';
import { mediaUrl } from '../utils/media';
import { useSermons } from '../hooks/queries';

const Sermons = () => {
  const [selectedSeries, setSelectedSeries] = useState('all');

  // Already sorted newest-first by Strapi.
  const { data: sermons = [], isPending, error } = useSermons();

  const seriesList = [...new Set(sermons.map((s) => s.series).filter(Boolean))];

  const filteredSermons =
    selectedSeries === 'all'
      ? sermons
      : sermons.filter((s) => s.series === selectedSeries);

  const featuredSermon = sermons[0];

  if (isPending) return <div className="loading">Loading sermons...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return (
    <div className="sermons-page">
      {/* Featured Sermon */}
      {featuredSermon && (
        <section className="featured-sermon">
          <div className="featured-content">
            <span className="featured-label">Latest Message</span>
            <h2>{featuredSermon.title}</h2>
            <div className="sermon-meta">
              <span className="sermon-speaker">{featuredSermon.speaker}</span>
              <span className="sermon-date">{formatDate(featuredSermon.date)}</span>
              {featuredSermon.series && (
                <span className="sermon-series">{featuredSermon.series}</span>
              )}
            </div>
            {featuredSermon.description && (
              <p className="sermon-description">
                {extractText(featuredSermon.description)}
              </p>
            )}
            <div className="sermon-actions">
              {featuredSermon.video_url && (
                <a
                  href={featuredSermon.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Watch Video
                </a>
              )}
              {featuredSermon.audio_url && (
                <a
                  href={featuredSermon.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Listen to Audio
                </a>
              )}
            </div>
          </div>
          {featuredSermon.thumbnail && (
            <div className="featured-thumbnail">
              <img src={mediaUrl(featuredSermon.thumbnail)} alt={featuredSermon.title} />
            </div>
          )}
        </section>
      )}

      {/* Filter Section */}
      {seriesList.length > 0 && (
        <div className="sermons-filter">
          <label htmlFor="series-filter">Filter by Series:</label>
          <select
            id="series-filter"
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
          >
            <option value="all">All Sermons</option>
            {seriesList.map((series) => (
              <option key={series} value={series}>
                {series}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sermons Grid */}
      <section className="sermons-grid-section">
        <h2>All Messages</h2>
        {filteredSermons.length === 0 ? (
          <p className="no-sermons">No sermons found. Check back soon!</p>
        ) : (
          <div className="sermons-grid">
            {filteredSermons.map((sermon) => (
              <div key={sermon.documentId} className="sermon-card">
                {sermon.thumbnail && (
                  <div className="sermon-thumbnail">
                    <img src={mediaUrl(sermon.thumbnail)} alt={sermon.title} />
                  </div>
                )}
                <div className="sermon-info">
                  <h3>{sermon.title}</h3>
                  <div className="sermon-meta">
                    <span className="sermon-speaker">{sermon.speaker}</span>
                    <span className="sermon-date">{formatDate(sermon.date)}</span>
                  </div>
                  {sermon.series && (
                    <span className="sermon-series-tag">{sermon.series}</span>
                  )}
                  {sermon.scripture && (
                    <p className="sermon-scripture">{sermon.scripture}</p>
                  )}
                  <div className="sermon-actions">
                    {sermon.video_url && (
                      <a
                        href={sermon.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-small"
                      >
                        Watch
                      </a>
                    )}
                    {sermon.audio_url && (
                      <a
                        href={sermon.audio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-small btn-outline"
                      >
                        Listen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Sermons;
