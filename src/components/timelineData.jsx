import PanelL from './view_mainPage/PanelL';
import PanelR from './view_mainPage/PanelR';

export const timelineItems = [
  {
    key: 'ENIAC',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', textAlign:'justify' }}>
        1945
      </div>
    ),
    children: (
      <PanelL image="../../public/images/Timeline1.png" headText="ENIAC" bodyText="In 1943 to 1945, one of the earliest electronic computers was in development called the ENIAC which is a large-scaled piece of technology that uses plugboards to send information." link="/panels/ENIAC"/>
    ),
  },
  {
    key: 'UNIVAC',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: ' 60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        1951
      </div>
    ),
    children: (
      <PanelR image="../../public/images/Timeline2.png" headText="UNIVAC" bodyText="Then in 1951, the UNIVAC became the first digital computer to be commercialized in the United States with using magnetic tape to handle input and output." link="/panels/UNIVAC"/>
    ),
  },
  {
    key: 'IBM701',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: ' 60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        1952
      </div>
    ),
    children: (
     <PanelL image="../../public/images/Timeline3.png" headText="IBM 701" bodyText="Following after the UNIVAC, the IBM 701 became the first commercial scientific computer containing a maximum memory of 2048, 36-bit words and each instruction set containing 18 bits." link="/panels/IBM701"/>
    ),
  },
  {
    key: 'CDC6600',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: ' 60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        1964
      </div>
    ),
    marginBottom: '10px',
    children: (
     <PanelR image="../../public/images/Timeline4.png" headText="CDC 6600" bodyText="In 1964, the CDC 6600 developed by Control Data Corporation was considered the first supercomputer and also a reduced instruction set computer (RISC) with an architecture of 65 instructions." link="/panels/CDC6600"/>
    ),
  },
  {
    key: 'CISC',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: ' 60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        1978
      </div>
    ),
    children: (
     <PanelL image="../../public/images/Timeline5.png" headText="CISC" bodyText="Through 1960s to 1970s, CISC was developed as software was becoming more complex which leads to the introduction of x86 ISA. This ISA is introduced through Intel 8086, one of the most notable CISCs in 1978." link="/panels/CISC"/>
    ),
  },
  {
    key: 'NASM',
    date: '',
    title: '',
    customMarker: (
      <div style={{ width: '60px', height: ' 60px', borderRadius: '50%', background: '#111844', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        1990
      </div>
    ),
    children: (
     <PanelR image="../../public/images/Timeline6.png" headText="x86-64 NASM AL" bodyText="As x86 grew in popularity, many assemblers such as GAS, MASM, and etc. were created. One of the most popular assemblers is NASM which is known for being open-source and its ability to produce various object files." link="/panels/NASM"/>
    ),
  },
];