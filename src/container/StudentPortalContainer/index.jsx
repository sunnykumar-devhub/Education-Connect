import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Book, 
  Clock, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../../utils/books';

const StudentPortalContainer = () => {
  // Mock student data
  const student = {
    name: "Sunny Kumar",
    rollNo: "EC-2024-1024",
    grade: "Class 10th-B",
    attendance: "94%",
    points: 1250,
    recentBooks: BOOKS.slice(0, 3)
  };

  const stats = [
    { label: 'Books Read', value: '12', icon: Book, color: 'bg-blue-500' },
    { label: 'Reading Hours', value: '48h', icon: Clock, color: 'bg-orange-500' },
    { label: 'Current Rank', value: '4th', icon: Award, color: 'bg-purple-500' },
    { label: 'Accuracy', value: '88%', icon: TrendingUp, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Portal Header */}
      <div className="bg-[#0f172a] text-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/20 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border-4 border-white/20 p-1">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#B45309] flex items-center justify-center text-3xl font-black">
                {student.name.charAt(0)}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase">Welcome, {student.name.split(' ')[0]}!</h1>
              <p className="text-white/60 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
                {student.grade} • {student.rollNo}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-[#3B82F6] hover:bg-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="bg-[#3B82F6] hover:bg-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Stats & Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center text-center"
                >
                  <div className={`${stat.color} p-3 rounded-2xl mb-4 shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-black text-[#0F172A]">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recently Read */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0F172A]/10 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-[#0F172A]" />
                  </div>
                  <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Recent Activity</h2>
                </div>
                <Link to="/" className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">View All Library</Link>
              </div>

              <div className="space-y-6">
                {student.recentBooks.map((book) => (
                  <div key={book.id} className="flex items-center justify-between group p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg overflow-hidden shadow-md">
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-black text-[#0F172A] text-sm group-hover:text-[#3B82F6] transition-colors">{book.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{book.subject}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                          <span className="text-[10px] font-black text-green-500 uppercase tracking-wider">75% Complete</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/read/${book.id}`} className="p-3 bg-[#3B82F6] text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Notifications */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#3B82F6]/10 p-3 rounded-xl">
                  <Bell className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Notice Board</h2>
              </div>
              
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-[#3B82F6]/20">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                  <div className="text-[10px] font-black text-[#3B82F6] uppercase mb-1">May 15, 2024</div>
                  <h5 className="font-bold text-slate-900 text-sm leading-tight">Annual Digital Literacy Competition Starts Tomorrow</h5>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">May 12, 2024</div>
                  <h5 className="font-bold text-slate-900 text-sm leading-tight">New Class 10th Science Materials Uploaded</h5>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">May 10, 2024</div>
                  <h5 className="font-bold text-slate-900 text-sm leading-tight">Library Maintenance Scheduled for Weekend</h5>
                </div>
              </div>
            </div>

            {/* Attendance & Performance */}
            <div className="bg-[#0f172a] rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden">
               <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-black uppercase tracking-tight">My Attendance</h2>
                 <Calendar className="w-5 h-5 text-white/50" />
               </div>
               <div className="flex items-end gap-3 mb-4">
                 <span className="text-5xl font-black">{student.attendance}</span>
                 <span className="text-white/50 text-[10px] font-bold uppercase mb-2">This Month</span>
               </div>
               <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                 <div className="bg-[#3B82F6] h-full w-[94%]"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentPortalContainer;
