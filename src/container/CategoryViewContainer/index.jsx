import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, GraduationCap, Filter } from 'lucide-react';
import { BOOKS } from '../../utils/books';
import BookCard from '../../components/BookCard';
import Breadcrumb from '../../components/UI/Breadcrumb';

const CategoryViewContainer = () => {
  const { type, name } = useParams(); // type can be 'grade' or 'subject'
  
  const filteredMaterials = useMemo(() => {
    const searchName = name.replace(/-/g, ' ');
    return BOOKS.filter(m => {
      if (type === 'grade') return m.grade.toLowerCase().includes(searchName.toLowerCase());
      if (type === 'subject') return m.subject.toLowerCase() === searchName.toLowerCase();
      return true;
    });
  }, [type, name]);

  const displayTitle = name.replace('-', ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: 'Resources', link: '/resources' }, { label: displayTitle }]} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 border-b-2 border-slate-100 pb-8 sm:pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#0F172A] p-2 rounded-lg">
                {type === 'grade' ? <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
              </div>
              <span className="text-[8px] sm:text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em] sm:tracking-[0.3em]">{type} COLLECTION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0F172A] uppercase tracking-tighter leading-none">
              {displayTitle}
            </h1>
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BookCard book={material} isNewPath={true} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-xl border border-slate-100 border-dashed">
            <Filter className="w-20 h-20 text-slate-100 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-[#0F172A] uppercase mb-2">No Resources Found</h3>
            <p className="text-slate-400 font-medium mb-8">We haven't uploaded materials for this category yet.</p>
            <Link to="/" className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Browse Full Library</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryViewContainer;
