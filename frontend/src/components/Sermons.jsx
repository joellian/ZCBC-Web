import React, { useState, useEffect } from 'react';
import './Sermons.css';
import { sermonsApi } from '../api';

const Sermons = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState('all');

    // Helper function to convert rich text to plain text
    const extractText = (richTextArray) => {
        if (!richTextArray || !Array.isArray(richTextArray)) return '';
        return richTextArray.map(block =>
            block.children?.map(child => child.text).join('') || ''
        ).join(' ');
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchSermons = async () => {
            try {
                setLoading(true);
                const response = await sermonsApi.getSermons();
                // Sort sermons by date (newest first)
                const sortedSermons = response.data.sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                );
                setSermons(sortedSermons);
            } catch (err) {
                setError('Failed to load sermons');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSermons();
    }, []);

    // Get unique series for filter
    const seriesList = [...new Set(sermons.map(s => s.series).filter(Boolean))];

    // Filter sermons by series
    const filteredSermons = selectedSeries === 'all'
        ? sermons
        : sermons.filter(s => s.series === selectedSeries);

    // Get the most recent sermon for featured section
    const featuredSermon = sermons[0];

    if (loading) return <div className="loading">Loading sermons...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="sermons-page">
            {/* Header Section */}
            <div className="sermons-header">
                <h1>SERMONS</h1>
                <p>Listen to our latest messages and grow in your faith journey with us</p>
            </div>

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
                                {typeof featuredSermon.description === 'string'
                                    ? featuredSermon.description
                                    : extractText(featuredSermon.description)}
                            </p>
                        )}
                        <div className="sermon-actions">
                            {featuredSermon.video_url && (
                                <a href={featuredSermon.video_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Watch Video
                                </a>
                            )}
                            {featuredSermon.audio_url && (
                                <a href={featuredSermon.audio_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                    Listen to Audio
                                </a>
                            )}
                        </div>
                    </div>
                    {featuredSermon.thumbnail && (
                        <div className="featured-thumbnail">
                            <img
                                src={`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${featuredSermon.thumbnail.url}`}
                                alt={featuredSermon.title}
                            />
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
                        {seriesList.map(series => (
                            <option key={series} value={series}>{series}</option>
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
                            <div key={sermon.id} className="sermon-card">
                                {sermon.thumbnail && (
                                    <div className="sermon-thumbnail">
                                        <img
                                            src={`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${sermon.thumbnail.url}`}
                                            alt={sermon.title}
                                        />
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
                                            <a href={sermon.video_url} target="_blank" rel="noopener noreferrer" className="btn-small">
                                                Watch
                                            </a>
                                        )}
                                        {sermon.audio_url && (
                                            <a href={sermon.audio_url} target="_blank" rel="noopener noreferrer" className="btn-small btn-outline">
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
