# CSARCH2_Group_7
# CSARCH2 Virtual Exhibit Case Proposal

# Link to Proposal Document
[Proposal Document](CSARCH2_Proposal_Group7.pdf)

# Title
“From 0's and 1's to Assembly: History of the x86-64 CISC Assembly Language”

## Member Roster
1. Bactong Gabrielle Joei Vasquez
2. Espineli Nyan Jezreel Gultiano
3. Gunita Catherine Rosswyn Dela Cruz
4. Magbatoc Ethan Daniel Berosa
5. Perez Jose Bryan Lee

## Website Deployment Link

https://csarch2-group-7.onrender.com/


## Things Done: 
For this case study, the group focused on researching key machines and their ISAs and how the evolution of these computers led to the x86-64 NASM Assembly Language. The group implemented the layout of the website, and the completion of the interactive drag and drop simulator of x86-64. The website is deployed through Github.io pages. The stack used for this project is Next.js with Tailwind CSS. For the interactive simulator, the group used the Blockly library (Blockly). The simulator contains different registers (8-bit, 16-bit, 32-bit, 64-bit) and simple instructions including ADD, SUB, INC, DEC, and MOV. These instructions can be operated from register to register and from constant to register. The simulator also implemented variable declaration blocks that can also function with the simple 5 instructions. Error handling and input handling were implemented for the simulator to be properly functional and debugged.      

## Challenges, Aha Moments, and Things Learned:

In implementing the interactive drag and drop simulator, the main challenge was understanding the library documentation and learning how to integrate this in Next.js with Tailwind CSS. Fortunately, Blockly documentation provided comprehensive guides in building Blockly applications from scratch. From there, the group learned about react hooks in displaying Blockly code (which is vanilla javascript), virtual DOMS, and how to learn from library documentations online. Moreover, we realized late that we initialized registers as Ints (which can only store up to 32 bits) which caused overflows from arithmetic operations to output the wrong values (EX: 0xFFFF + 0xFFFF = 0x10000000000000000). Learning from this, we realized that data type ranges when creating simulations are one of the first things to consider as forgetting about them will cause more confusion and revisions along the way. Lastly, it took us a while to realize that our sign extension logic for immediate 32-bit values was incorrect. Our original logic was simply padding the first character of the hex value (EX: 80000000 -> 8888888880000000). 

Another challenge we had was finding improvements for the layouts and design of the website. For this, we looked at some examples of professional website design online and take inspiration from them to implement elements. Overall, this case study has made us learn the history of ISAs and how it evolved to this modern era. With the simulator implementation, it also gives us an insight into how concepts of Assembly such as registers are integrated into elements of digital computers nowadays. Additionally, researching information of the past machines and their milestones in each period makes us appreciate the evolution of technology that shaped the world to the era that is now. 

---

## Topic Theme

**Theme: The History of the x86-64 NASM Assembly Language**


Assembly Language is a low-level language that allows programmers to communicate directly with computer hardware, offering more speed, space, and capability than most high-level languages. But before x86-64, ARM, MIPS–and the more popular assembly languages used today, computer scientists had to communicate directly with hardware using long strings of 0s and 1s. The history of assembly language can be traced back several decades, evolving from Alan Turing’s Enigma code machine in 1939, John Von Neumann’s stored-program concept in the 1940s, Maruice Wilkes EDSAC in 1949, and Grace Hopper’s symbolic programming concepts in 1952 to the well-known assembly languages we use today, assembly language has seen many breakthroughs and contributions to modern technology, one of them being the invention of x86-64 NASM assembly language (Alheraki, 2025).

Thus, our exhibit’s topic will focus on the history of one of the more popular assembly languages today, the x86-64 NASM assembly language. Our exhibit aims to inform the audience of the evolution of the x86-64 instruction set architecture (ISA), starting from key machines and their ISAs such as ENIAC, UNIVAC I, IBM 701, and CDC 6600, and how they all lead to the emergence of CISC and the invention of the x86-64 NASM AL. This will be done through an interactive presentation about the timeline leading up to the x86-64 NASM AL along with an interactive drag and drop simulation of how to program with an x86-64 NASM assembly language in SASM and how demonstrates 8-bit, 16-bit, 32-bit and 64-bit registers. Additionally, the UI theme would closely follow a professional site to immerse the audience.

**Key Machines and their ISAs**

**ENIAC (1945)**
The ENIAC, also known as the Electronic Numerical Integrator and Computer, is the first programmable computer created. It was built during World War II, mainly for calculating artillery values. Its known advantage was that once it was programmed, the machine ran at an electronic speed. However, the ENIAC was far from the ideal/universal computer used today. The machine needs to be rewired and configured for each new problem, which is time-consuming. 

**UNIVAC (1951)**
The UNIVAC, also known as the Universal Automatic Computer, is one of the earliest commercial data-processing computers. It was intended to replace punched-card accounting machines. It can read 7,200 decimal digits per second. It uses an operator keyboard and console typewriter for simple or limited input,  and magnetic tape for other inputs and outputs. The printed output produced was recorded on tapes and printed in a separate tape printer. 

**IBM 701 (1952)**
The IBM 701, also known as the defense calculator, was IBM's first production computer. It was built for scientific calculation and engineering computation for military and defence applications. It uses binary vacuum-tube logic computers with 36-bit words.  

**CDC 6600 (1964)**
During 1965-1977, CDC 6600 was considered the first supercomputer. It has the fastest clock speed of 100 nanoseconds, which is arguably very fast for its era. It is a general-purpose computer system, equipped with a distributed architecture. Utilizing a central scientific processor that is supported by 10 very fast peripheral processors, which handle the inputs and outputs. Its architecture only has 65 instructions.  

	
**How it all led to the x86-64 NASM Assembly Language**
	
By the late 1960s to early 1970s, software was becoming more complex while memory remained expensive. This forced hardware engineers to develop CISC with the ultimate goal of reducing the number of instructions a processor needed to execute for a task (Alheraki, 2025). Other goals were: 
1. Increase code density
2. Simplify programming
3. Reduce compiler workload
4. Improve productivity  

The development of CISC introduced Intel 8080, which would then introduce the x86-64 ISA, with the evolution of 64-bit registers.

**Evolution of Registers and their Processors**

Before the existence of the x86 family, early microprocessors such as the Intel 8080 (1974) or MOS Technology 6502 (1975) used 8-bit registers. These were named with single letters such as: A, B, H, or L. A few years later, Intel further advanced and created the Intel 8086 which now contained 16-bit registers. These registers now included two letters such as: AX, BX, DI, etc. Additionally, this microprocessor introduced the Instruction Set which allowed many computer operations.

With its evolution, naturally came the 32-bit registers as it extended the old 16-bit registers into 32-bit ones. This also translated into its register names by adding ‘E’ for ‘extended’ in the register names such as: EAX, ECX, etc that was led by Intel with the introduction of their Intel 80386 in 1985. The architecture became known as x64 due to its several Intel processors that carried the names ending in ‘86’ such as the aforementioned 8086 and 80386. 64-bit registers were introduced with AMD64, also known as, x86-64 in 2003 for larger memory addressing and faster processing. Its registers included: RAX, RBX, RCX, etc. Modern assemblers, such as NASM, support writing assembly code in both 32-bit x86 and 64-bit x86-64 systems.


---

## Tech Stack Plan
**The following are the intended interactive elements for the exhibit:** 

---

## Interactive Element

The first interactive element of our exhibit would be an **interactive timeline of the early key machines and their ISAs** such as the ENIAC, UNIVAC I, IBM 701, and CDC 6600, and how they all lead to the emergence of CISC and the invention of the x86-64 NASM AL. This will be done by visually presenting the audience with a timeline. In the timeline, the timeline dates would be presented as a “bubble”, and the audience would be able to click them to learn more information. 

![Image of Figure 1 about the first interactive element](images/Figure1.png)

**Fig 1. Concept draft of the interactive timeline of x86-64** 

The second interactive element of our exhibit would be an **interactive drag and drop simulation of coding with an x86-64 NASM assembly language.** This would be similar to the popular programming language and site “scratch” (See https://scratch.mit.edu/)

![Image of Figure 2 about the second interactive element](images/Figure2.png)
			
**Fig 2. Concept draft of the interactive drag and drop simulation of x86-64**

The simulator will allow the audience to simulate basic x86-64 SASM instructions such as MOV, ADD, and INC instructions demonstrating the use of the different registers (8-bit, 16-bit, 32-bit, 64-bit).

---

## Mobile-Responsive Layout (if possible)

![Image of Figure 3 about the mobile layout](images/Mobilepreview.png)

**Fig 3. Concept draft of mobile layout**

---

## Style Guide Snapshot
The style guide consists of elements such as the **text styles and color palettes** to be used for the interactive element.

![Image of Figure 4 about the style guide](images/Figure4.png)

**Fig 4. Concept draft of the style guide**

![Image of Figure 5 about the layout design for exhibit](images/Figure5.png)

**Fig 5. Concept style of layouts and design for the exhibit**



**Disclosure on the use of AI/LLM**

AI was used only as a reference tool for quick lookups of correct syntax and debugging in front-end development. It was not used to blindly generate entire sections of code, nor was it used to generate content for the website. Instead, it was used to check the clarity and the accuracy of the information found on the website.


## References:
Alheraki, A. (2025). The history of assembly language and CPU architectures. simplifycpp. https://simplifycpp.org/books/Assembly_Language_History.pdf

CDC 6600 | Computational and Information Systems Lab. (n.d.). Www.Cisl.Ucar.Edu. Retrieved July 7, 2026, from https://www.cisl.ucar.edu/ncar-supercomputing-history/cdc6600

Control Data Corporation. (1967, April). 6400/6500/6600 COMPUTER SYSTEMS COMPASS Reference Manual. Palo Alto; Control Data Corporation. https://www.bitsavers.org/pdf/cdc/cyber/lang/compass/60190900_COMPASS_Reference_Manual_196704.pdf

Doug Jones. (n.d.). Doug Jones's computer program punched Card Collection. A Collection of Punched Cards for Computer Programs. https://landley.net/history/mirror/pre/punchedcards/collection/i-program.html

Eckert and Mauchly Develop the ENIAC | EBSCO. (2023). EBSCO Information Services, Inc. | Www.Ebsco.Com. https://www.ebsco.com/research-starters/computer-science/eckert-and-mauchly-develop-eniac

ENIAC (Electronic Numerical Integrator And Computer) - definition | Transfer Multisort Elektronik. (2025). TME. https://www.tme.eu/en/news/library-articles/glossary/page/68902/eniac-electronic-numerical-integrator-and-computer-definition/

Evans, D. (n.d.). X86 assembly guide. Guide to x86 Assembly. https://www.cs.virginia.edu/~evans/cs216/guides/x86.html

Freiberger, P. A., & Swaine, M. R. (2018). ENIAC. In Encyclopædia Britannica. https://www.britannica.com/technology/ENIAC

Freiberger, P. A., & Swaine, M. R. (n.d.). UNIVAC | computer. Encyclopedia Britannica. Retrieved July 7, 2026, from https://www.britannica.com/technology/UNIVAC

GeeksforGeeks. (2024, February 26). What Is the Full Form of UNIVAC? GeeksforGeeks. https://www.geeksforgeeks.org/computer-organization-architecture/what-is-the-full-form-of-univac/

George Gray (1999). UNIVAC I Instruction Set - Folklore  https://ptacts.uspto.gov/ptacts/public-informations/petitions/1464240/download-documents?artifactId=Wc9j3Pypuj72GUOhGdt8ZP0WHA4pvFj-ndms5ZVMRLqWQvnHBEio1TQ 

History.com Editors. (2010, July 20). UNIVAC, the first commercially produced digital computer in the U.S, is dedicated | June 14, 1951 | HISTORY. History. https://www.history.com/this-day-in-history/june-14/univac-computer-dedicated

HP. (2022). Computer History: All About the ENIAC. Hp.Com; HP. https://www.hp.com/gb-en/shop/tech-takes/computer-history-all-about-the-eniac

IBM. (n.d.). IBM 700 Series. Www.Ibm.Com. Retrieved July 7, 2026, from https://www.ibm.com/history/700

Introduction to x86 Assembly Programming. Adwaith's Chronicles. (2018, August 12). https://www.agautham.io/rebeseries/2018/08/12/introduction-to-x86-assembly-programming.html

Simon Tatham: About Me. (2018). Greenend.Org.Uk. https://www.chiark.greenend.org.uk/~sgtatham/me.html

Timeline: A brief history of the x86 microprocessor. (n.d.). Computerworld. Retrieved July 7, 2026, from https://www.computerworld.com/article/1575191/timeline-a-brief-history-of-the-x86-microprocessor.html

US Census Bureau. (2024, August 19). UNIVAC I. Census.Gov. https://www.census.gov/about/history/bureau-history/census-innovations/technology/univac-i.html

x86assembly. (n.d.). Cs.Lmu.Edu. Retrieved July 7, 2026, from https://cs.lmu.edu/~ray/notes/x86assembly/

Zinn, K., Finkel, J., & Hollland, D. (2002). Developmental History of main-line Intel CPUs. https://users.cs.jmu.edu/abzugcx/Public/Student-Produced-Term-Projects/Computer-Organization-2002-SPRING/Intel-CPUs-by-Kayla-Zinn-Jeff-Finkel-Daniel-Holland-2002-SPR.doc




