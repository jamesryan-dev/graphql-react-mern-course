import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client }) {
  return (
    <div className="mb-3">
      <h5 className="mt-5 mb-3">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item text-bg-dark">
          <FaIdBadge className="icon" /> {client.name}
        </li>
        <li className="list-group-item text-bg-dark">
          <FaEnvelope className="icon" /> {client.email}
        </li>
        <li className="list-group-item text-bg-dark">
          <FaPhone className="icon" /> {client.phone}
        </li>
      </ul>
    </div>
  );
}
