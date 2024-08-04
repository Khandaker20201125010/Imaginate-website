import { useEffect, useState } from 'react';
import axios from 'axios';
import MemebersParticles from '../MemeberParticles/MemebersParticles';

const MemberShow = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('https://imaginate-server.vercel.app/users');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className='min-h-screen'>
            <div className="container min-h-screen mx-auto px-4 py-8">
                <div className="overflow-x-auto">
                    <MemebersParticles />
                    <table className="min-w-full bg-gray-800 text-white">
                        <thead>
                            <tr className="bg-gray-900">
                                <th className="py-2 px-4 text-left">S.No</th>
                                <th className="py-2 px-4 text-left">Photo</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Login time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={member._id} className="bg-gray-700 border-b border-gray-600">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">
                                        <img 
                                            src={member.photoURL} 
                                            alt={member.name} 
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{member.name}</td>
                                    
                                    <td className="py-2 px-4">{member.postTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MemberShow;
