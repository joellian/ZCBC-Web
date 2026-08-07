import LeaderCard from './LeaderCard';

const DepartmentGroup = ({ department, leaders }) => (
  <div className="department-group">
    <h3>{department}</h3>
    <div className="leaders-grid">
      {leaders.map((leader) => (
        <LeaderCard key={leader.documentId} leader={leader} />
      ))}
    </div>
  </div>
);

export default DepartmentGroup;
