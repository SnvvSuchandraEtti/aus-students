import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Student, CAMPUSES, COLLEGE_TYPES, getDepartmentsByType,
  generateStudentData,
} from '@/types/student';

// ─── Preset Data ────────────────────────────────────────────────────
const CHALLENGES = [
  "Give a shoutout to your favorite senior 📣",
  "Do a 10-second dance 💃",
  "Compliment the person to your left 🤝",
  "Share your most embarrassing college memory 😳",
  "Teach everyone a word in your mother tongue 🗣️",
  "Imitate a famous professor walk 🚶",
  "Sing a line from any movie song 🎤",
  "Show your best selfie face 📸",
  "Do your best cricket commentary 🏏",
  "Tell us your canteen order in a dramatic voice 🍔",
];

const PAIR_CHALLENGES = [
  "Senior roasts Junior in 10 seconds 🔥",
  "Junior compliments Senior in the most dramatic way 🎭",
  "Both do a handshake they just invented 🤝",
  "Senior gives one piece of life advice 🧠",
  "Junior imitates Senior's walk 🚶‍♂️",
  "Both share their worst exam story 📝",
  "Rock-paper-scissors: loser does 5 pushups 💪",
  "Both sing a duet of any song 🎵",
];

const TRUTHS = [
  "What's your GPA honestly? 📊",
  "Name your secret crush department 👀",
  "What do you actually do during lectures? 📱",
  "Which professor scares you the most? 😨",
  "What's your go-to canteen cheat meal? 🍕",
  "How many backlogs have you cleared? 📚",
  "What's your most used excuse for being late? ⏰",
  "Who do you copy assignments from? 📝",
  "What's the longest you've slept through classes? 😴",
  "Which subject would you erase from existence? 🗑️",
];

const DARES = [
  "Call out a professor's name dramatically 📢",
  "Sing one line of a Telugu film song 🎶",
  "Swap phones with someone for 2 minutes 📱",
  "Do 10 jumping jacks right now 🏃",
  "Talk in a British accent for 30 seconds 🎩",
  "Propose to the nearest chair dramatically 💍",
  "Narrate your morning routine like a cricket match 🏏",
  "Walk like a robot to the nearest door and back 🤖",
  "Do your best Tollywood villain laugh 😈",
  "Let the group post anything on your WhatsApp status 📲",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

// ─── Year helper ────────────────────────────────────────────────────
const getYearsForType = (type: string) => {
  switch (type) {
    case 'engineering':
      return ['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];
    case 'diploma':
      return ['2017','2018','2019','2020','2021','2022','2023','2024'];
    case 'bba':
      return ['2019','2020','2021','2022','2023'];
    case 'pharma':
    case 'forensic':
      return ['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];
    default:
      return [];
  }
};

// ─── Confetti ───────────────────────────────────────────────────────
const ConfettiPiece = ({ delay }: { delay: number }) => {
  const colors = ['#a855f7','#06b6d4','#ec4899','#facc15','#34d399'];
  const color = pick(colors);
  const left = Math.random() * 100;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ backgroundColor: color, left: `${left}%`, top: -8 }}
      initial={{ opacity: 1, y: 0, rotate: 0 }}
      animate={{ opacity: 0, y: 400, rotate: rotation + 720, x: (Math.random() - 0.5) * 200 }}
      transition={{ duration: 1.5 + Math.random(), delay, ease: 'easeOut' }}
    />
  );
};

const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
    {Array.from({ length: 40 }).map((_, i) => (
      <ConfettiPiece key={i} delay={i * 0.03} />
    ))}
  </div>
);

// ─── Reusable filter row ────────────────────────────────────────────
const FilterSelect = ({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-medium text-purple-300/70 uppercase tracking-wider">{label}</span>
    <Select value={value || '__none__'} onValueChange={(v) => onChange(v === '__none__' ? '' : v)}>
      <SelectTrigger className="bg-white/5 border-purple-500/30 text-purple-100 h-9 text-sm focus:ring-purple-500/50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[hsl(260,20%,14%)] border-purple-500/30 text-purple-100">
        <SelectItem value="__none__">Select…</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// ════════════════════════════════════════════════════════════════════
// FEATURE 1 — Random Student Spinner
// ════════════════════════════════════════════════════════════════════
const RandomSpinner = ({ students }: { students: Student[] }) => {
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Student | null>(null);
  const [challenge, setChallenge] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [cycleImg, setCycleImg] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pool = useMemo(() =>
    students.filter((s) => {
      if (program && s.campus.type !== program) return false;
      if (year && s.year !== year) return false;
      return true;
    }),
    [students, program, year]
  );

  const years = useMemo(() => getYearsForType(program), [program]);

  const spin = useCallback(() => {
    if (pool.length === 0 || spinning) return;
    setResult(null);
    setShowConfetti(false);
    setSpinning(true);

    // rapid cycling
    let count = 0;
    const total = 25 + Math.floor(Math.random() * 15);
    intervalRef.current = setInterval(() => {
      const rand = pool[Math.floor(Math.random() * pool.length)];
      setCycleImg(rand.imageUrl);
      count++;
      if (count >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const winner = pool[Math.floor(Math.random() * pool.length)];
        setResult(winner);
        setCycleImg('');
        setChallenge(pick(CHALLENGES));
        setSpinning(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
    }, 80);
  }, [pool, spinning]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <section className="relative rounded-2xl border border-purple-500/20 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8">
      {showConfetti && <Confetti />}
      <h2 className="text-xl sm:text-2xl font-bold text-purple-200 mb-5 flex items-center gap-2">
        🎰 Random Student Spinner
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
        <FilterSelect
          label="Program"
          value={program}
          onChange={(v) => { setProgram(v); setYear(''); }}
          options={COLLEGE_TYPES.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
        />
        <FilterSelect
          label="Year / Batch"
          value={year}
          onChange={setYear}
          options={years.map((y) => ({ value: y, label: y }))}
        />
      </div>

      {/* Spin area */}
      <div className="flex flex-col items-center gap-5">
        {/* Cycling image */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-purple-900/30 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {spinning && cycleImg ? (
              <motion.img
                key={cycleImg}
                src={cycleImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.06 }}
              />
            ) : result ? (
              <motion.img
                key={result.rollNumber}
                src={result.imageUrl}
                alt={result.rollNumber}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            ) : (
              <span className="text-5xl">🎰</span>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={spin}
          disabled={spinning || pool.length === 0}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg shadow-purple-900/40 active:scale-95 transition-transform disabled:opacity-40"
        >
          {spinning ? 'Spinning…' : 'SPIN 🎰'}
        </Button>

        {pool.length === 0 && program && (
          <p className="text-sm text-pink-400/70">No students found for this selection.</p>
        )}

        {/* Result card */}
        <AnimatePresence>
          {result && !spinning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-3"
            >
              <p className="text-purple-100 font-semibold text-lg">{result.rollNumber}</p>
              <p className="text-sm text-purple-300/70">{result.campus.fullName}</p>
              <div className="mt-3 px-4 py-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <p className="text-sm font-medium text-pink-300">🎯 Challenge</p>
                <p className="text-pink-100 mt-1">{challenge}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════════
// FEATURE 2 — Senior–Junior Pair Matcher
// ════════════════════════════════════════════════════════════════════
const PairMatcher = ({ students }: { students: Student[] }) => {
  const [seniorType, setSeniorType] = useState('engineering');
  const [seniorYear, setSeniorYear] = useState('');
  const [seniorDept, setSeniorDept] = useState('');
  const [juniorType, setJuniorType] = useState('engineering');
  const [juniorYear, setJuniorYear] = useState('');
  const [juniorDept, setJuniorDept] = useState('');

  const [matched, setMatched] = useState(false);
  const [senior, setSenior] = useState<Student | null>(null);
  const [junior, setJunior] = useState<Student | null>(null);
  const [compat, setCompat] = useState(0);
  const [pairChallenge, setPairChallenge] = useState('');
  const [animPhase, setAnimPhase] = useState<'idle' | 'vs' | 'done'>('idle');

  const seniorPool = useMemo(() =>
    students.filter((s) => s.campus.type === seniorType && (!seniorYear || s.year === seniorYear) && (!seniorDept || s.department.id === seniorDept)),
    [students, seniorType, seniorYear, seniorDept]
  );
  const juniorPool = useMemo(() =>
    students.filter((s) => s.campus.type === juniorType && (!juniorYear || s.year === juniorYear) && (!juniorDept || s.department.id === juniorDept)),
    [students, juniorType, juniorYear, juniorDept]
  );

  const seniorDepts = useMemo(() => getDepartmentsByType(seniorType), [seniorType]);
  const juniorDepts = useMemo(() => getDepartmentsByType(juniorType), [juniorType]);
  const seniorYears = useMemo(() => getYearsForType(seniorType), [seniorType]);
  const juniorYears = useMemo(() => getYearsForType(juniorType), [juniorType]);

  const match = useCallback(() => {
    if (!seniorPool.length || !juniorPool.length) return;
    setMatched(false);
    setAnimPhase('vs');
    const s = pick(seniorPool);
    const j = pick(juniorPool);
    setSenior(s);
    setJunior(j);
    setCompat(70 + Math.floor(Math.random() * 30));
    setPairChallenge(pick(PAIR_CHALLENGES));

    setTimeout(() => {
      setAnimPhase('done');
      setMatched(true);
    }, 1800);
  }, [seniorPool, juniorPool]);

  const SideFilters = ({
    label, type, setType, year, setYear, dept, setDept, depts, years,
  }: {
    label: string; type: string; setType: (v: string) => void;
    year: string; setYear: (v: string) => void;
    dept: string; setDept: (v: string) => void;
    depts: { id: string; name: string; icon: string }[];
    years: string[];
  }) => (
    <div className="space-y-2">
      <span className="text-xs font-bold text-cyan-300/80 uppercase tracking-widest">{label}</span>
      <FilterSelect label="Program" value={type} onChange={(v) => { setType(v); setYear(''); setDept(''); }}
        options={COLLEGE_TYPES.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))} />
      <FilterSelect label="Department" value={dept} onChange={setDept}
        options={depts.map((d) => ({ value: d.id, label: `${d.icon} ${d.name}` }))} />
      <FilterSelect label="Year" value={year} onChange={setYear}
        options={years.map((y) => ({ value: y, label: y }))} />
    </div>
  );

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-cyan-200 mb-5 flex items-center gap-2">
        💘 Senior–Junior Pair Matcher
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <SideFilters label="Senior 🎓" type={seniorType} setType={setSeniorType} year={seniorYear}
          setYear={setSeniorYear} dept={seniorDept} setDept={setSeniorDept} depts={seniorDepts} years={seniorYears} />
        <SideFilters label="Junior 🌱" type={juniorType} setType={setJuniorType} year={juniorYear}
          setYear={setJuniorYear} dept={juniorDept} setDept={setJuniorDept} depts={juniorDepts} years={juniorYears} />
      </div>

      <div className="flex justify-center mb-6">
        <Button
          onClick={match}
          disabled={!seniorPool.length || !juniorPool.length || animPhase === 'vs'}
          className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg shadow-cyan-900/40 active:scale-95 transition-transform disabled:opacity-40"
        >
          {animPhase === 'vs' ? 'Matching…' : 'Match Us! 💘'}
        </Button>
      </div>

      {/* VS / Result display */}
      <AnimatePresence mode="wait">
        {animPhase === 'vs' && senior && junior && (
          <motion.div
            key="vs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-4 sm:gap-8"
          >
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-cyan-500/40"
            >
              <img src={senior.imageUrl} alt="" className="w-full h-full object-cover" />
            </motion.div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-orange-500"
            >
              VS
            </motion.span>
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-purple-500/40"
            >
              <img src={junior.imageUrl} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}

        {animPhase === 'done' && matched && senior && junior && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="text-center space-y-1">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-cyan-500/40 mx-auto">
                  <img src={senior.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-cyan-300/70 truncate max-w-[7rem]">{senior.rollNumber}</p>
              </div>
              <span className="text-2xl">✨</span>
              <div className="text-center space-y-1">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-purple-500/40 mx-auto">
                  <img src={junior.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-purple-300/70 truncate max-w-[7rem]">{junior.rollNumber}</p>
              </div>
            </div>

            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400"
            >
              MATCHED! ✨ {compat}% compatible
            </motion.p>

            <div className="px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 inline-block">
              <p className="text-cyan-100">{pairChallenge}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════════
// FEATURE 3 — Truth or Dare Wheel
// ════════════════════════════════════════════════════════════════════
const SEGMENTS = 8;
const SEGMENT_ANGLE = 360 / SEGMENTS;

const TruthOrDareWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ type: 'truth' | 'dare'; text: string } | null>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extra = 1440 + Math.random() * 720; // 4-6 full turns
    const newRot = rotation + extra;
    setRotation(newRot);

    setTimeout(() => {
      // determine where it lands
      const normalised = newRot % 360;
      const segIndex = Math.floor(normalised / SEGMENT_ANGLE) % SEGMENTS;
      const isTruth = segIndex % 2 === 0;
      const text = isTruth ? pick(TRUTHS) : pick(DARES);
      setResult({ type: isTruth ? 'truth' : 'dare', text });
      setSpinning(false);
    }, 3500);
  }, [spinning, rotation]);

  return (
    <section className="rounded-2xl border border-pink-500/20 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-pink-200 mb-5 flex items-center gap-2">
        🎡 Truth or Dare Wheel
      </h2>

      <div className="flex flex-col items-center gap-6">
        {/* Wheel */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />

          <motion.div
            className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
            animate={{ rotate: rotation }}
            transition={{ duration: 3.5, ease: [0.17, 0.67, 0.12, 0.99] }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {Array.from({ length: SEGMENTS }).map((_, i) => {
                const startAngle = i * SEGMENT_ANGLE;
                const endAngle = startAngle + SEGMENT_ANGLE;
                const isTruth = i % 2 === 0;
                const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);

                const toRad = (d: number) => (d * Math.PI) / 180;
                const x1 = 100 + 100 * Math.cos(toRad(startAngle));
                const y1 = 100 + 100 * Math.sin(toRad(startAngle));
                const x2 = 100 + 100 * Math.cos(toRad(endAngle));
                const y2 = 100 + 100 * Math.sin(toRad(endAngle));

                const textX = 100 + 62 * Math.cos(midAngle);
                const textY = 100 + 62 * Math.sin(midAngle);
                const textRotation = (startAngle + endAngle) / 2;

                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                      fill={isTruth ? 'hsl(230, 60%, 35%)' : 'hsl(350, 60%, 40%)'}
                      stroke="hsl(0,0%,100%,0.1)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    >
                      {isTruth ? 'TRUTH' : 'DARE'}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="16" fill="hsl(260,30%,20%)" stroke="hsl(0,0%,100%,0.2)" strokeWidth="1" />
              <text x="100" y="102" fill="white" fontSize="10" textAnchor="middle" dominantBaseline="middle">🎡</text>
            </svg>
          </motion.div>
        </div>

        <Button
          onClick={spin}
          disabled={spinning}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg shadow-pink-900/40 active:scale-95 transition-transform disabled:opacity-40"
        >
          {spinning ? 'Spinning…' : 'SPIN THE WHEEL 🎡'}
        </Button>

        <AnimatePresence>
          {result && !spinning && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`px-6 py-4 rounded-xl border text-center max-w-sm ${
                result.type === 'truth'
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                result.type === 'truth' ? 'text-blue-300' : 'text-red-300'
              }`}>
                {result.type === 'truth' ? '🔵 TRUTH' : '🔴 DARE'}
              </p>
              <p className="text-white/90">{result.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════════════════
const GameZone = () => {
  const students = useMemo(() => generateStudentData(), []);

  return (
    <div className="min-h-screen bg-[hsl(260,20%,8%)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[hsl(260,20%,8%)]/80 backdrop-blur-md border-b border-purple-500/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Gallery</span>
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Game Zone
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        <RandomSpinner students={students} />
        <PairMatcher students={students} />
        <TruthOrDareWheel />
      </main>
    </div>
  );
};

export default GameZone;
