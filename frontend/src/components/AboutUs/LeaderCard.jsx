import { extractText } from '../../utils/text';
import { mediaUrl } from '../../utils/media';

const LeaderCard = ({ leader }) => {
  const photo = mediaUrl(leader.photo);

  return (
    <div className="leader-card">
      {photo ? (
        <img src={photo} alt={leader.name} className="leader-photo" />
      ) : (
        <div className="leader-photo-placeholder">
          <span>{leader.name.charAt(0)}</span>
        </div>
      )}
      <div className="leader-info">
        <h4>{leader.name}</h4>
        <p className="leader-title">{leader.title}</p>
        {leader.bio && <p className="leader-bio">{extractText(leader.bio)}</p>}
        {leader.email && (
          <a href={`mailto:${leader.email}`} className="leader-email">
            {leader.email}
          </a>
        )}
      </div>
    </div>
  );
};

export default LeaderCard;
