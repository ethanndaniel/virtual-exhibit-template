"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import * as libraryBlocks from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import Link from 'next/link';

Blockly.setLocale(En);

export default function AssemblyEditor() {
    const blocklyDiv = useRef(null);
    const [nasmCode, setNasmCode] = useState("");

    // NOTE: hi ethan, made these in bigInts - putting FFFFFFFF caused overflows
    const [registers, setRegisters] = useState({rax: 0n, rbx: 0n, rcx: 0n, rdx: 0n}); // 4 registers

    // mapping of registers based on bit sizes
    const mapRegister = {
        rax: { base: "rax", size: 64 },
        eax: { base: "rax", size: 32 },
        ax: { base: "rax", size: 16 },
        al: { base: "rax", size: 8 },
        ah: { base: "rax", size: 8 },

        rbx: { base: "rbx", size: 64 },
        ebx: { base: "rbx", size: 32 },
        bx: { base: "rbx", size: 16 },
        bl: { base: "rbx", size: 8 },
        bh: { base: "rbx", size: 8 },

        rcx: { base: "rcx", size: 64 },
        ecx: { base: "rcx", size: 32 },
        cx: { base: "rcx", size: 16 },
        cl: { base: "rcx", size: 8 },
        ch: { base: "rcx", size: 8 },

        rdx: { base: "rdx", size: 64 },
        edx: { base: "rdx", size: 32 },
        dx: { base: "rdx", size: 16 },
        dl: { base: "rdx", size: 8 },
        dh: { base: "rdx", size: 8 },
    };

    // read register value based on bit size and name
    function readRegister(name, regs) {
        const registerInfo = mapRegister[name.toLowerCase()];

        if (!registerInfo) {return undefined;}
        const value = regs[registerInfo.base];

        switch(registerInfo.size) {
            case 64: return value
            case 32: return value & 0xFFFFFFFFn
            case 16: return value & 0xFFFFn
            case 8: 
                if (name.endsWith('h')) {
                    return (value >> 8n) & 0xFFn;
                }
                return value & 0xFFn;
                
            default: return undefined;
        }
    }

    useEffect(() => {
        if (!blocklyDiv.current) return;

        // BLOCK DEFINITIONS //

        // ret block
        Blockly.Blocks['ret'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("ret");
                this.setPreviousStatement(true, null);
            }
        }

        // segment block
        Blockly.Blocks['section'] = {
            init: function() {
                this.appendEndRowInput()
                    .appendField("section")
                    .appendField(new Blockly.FieldDropdown([[".text", "TEXT"]]), "SECTION");
                this.appendStatementInput("CODE").appendField();
                this.setColour(300);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip("Define the basic structure of your SASM assembler program.");
            }
        }

        // MOV REG, REG/CONST block
        Blockly.Blocks['mov_reg'] = {
            init: function() {
                initArithmeticBlock(this, "MOV", "Move contents of source register to destination register.")
            }
        };

        // ADD REG, REG/CONST Block
        Blockly.Blocks['add_reg'] = {
            init: function() {
                initArithmeticBlock(this, "ADD", "Add contents of source register to destination register.") 
            }
        }

        // SUB REG, REG/CONST Block
        Blockly.Blocks['sub_reg'] = {
            init: function() {
                initArithmeticBlock(this, "SUB", "Subtract contents of source register from destination register.")
            }
        }

        Blockly.Blocks['inc_reg'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("INC")
                    .appendField(new Blockly.FieldDropdown([["rax","RAX"], ["rbx","RBX"], ["rcx","RCX"], ["rdx","RDX"]]), "DEST")
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(150);
                this.setTooltip("Increment the value in the destination register.");
            }
        }

        Blockly.Blocks['dec_reg'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("DEC")
                    .appendField(new Blockly.FieldDropdown([["rax","RAX"], ["rbx","RBX"], ["rcx","RCX"], ["rdx","RDX"]]), "DEST")
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(150);
                this.setTooltip("Decrement the value in the destination register.");
            }
        }

        // BLOCK GENERATORS //
        javascriptGenerator.forBlock['mov_reg'] = function(block) {
            let [dest, src] = arithmeticGenerator(block);
            return `    mov ${dest}, ${src}\n`;
        };

        javascriptGenerator.forBlock['section'] = function(block) {
            const section = block.getFieldValue('SECTION').toLowerCase();
            const nestedBlocks = javascriptGenerator.statementToCode(block, 'CODE');
            return `section ${section}\n${nestedBlocks}`
        };

        javascriptGenerator.forBlock['ret'] = function(block) {
            return `    ret`;
        };

        javascriptGenerator.forBlock['add_reg'] = function(block) {
            let [dest, src] = arithmeticGenerator(block);
            return `    add ${dest}, ${src}\n`;
        };

        javascriptGenerator.forBlock['sub_reg'] = function(block) {
            let [dest, src] = arithmeticGenerator(block);
            return `    sub ${dest}, ${src}\n`;
        };

        javascriptGenerator.forBlock['inc_reg'] = function(block) {
            const dest = block.getFieldValue('DEST').toLowerCase();
            return `    inc ${dest}\n`;
        };

        javascriptGenerator.forBlock['dec_reg'] = function(block) {
            const dest = block.getFieldValue('DEST').toLowerCase();
            return `    dec ${dest}\n`;
        };

        // COMBINING OF CODE BLOCKS IN THE WORKSPACE //
        javascriptGenerator.scrub_ = function(block, code, thisBlockOnly) {
            // gets next block
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            if (nextBlock && !thisBlockOnly) {
                return code + javascriptGenerator.blockToCode(nextBlock); // concatenate code together
            }
            return code;
        }

        // TOOLBOX DEFINITION //
        const toolBox = {
            // toolbox with no categories for now
            kind: 'flyoutToolbox',

            // the blocks that we have for now
            contents: [
                { kind: 'block', type: 'mov_reg', },
                { kind: 'block', type: 'section', },
                { kind: 'block', type: 'ret', },
                { kind: 'block', type: 'add_reg' },
                { kind: 'block', type: 'sub_reg' },
                { kind: 'block', type: 'inc_reg' },
                { kind: 'block', type: 'dec_reg' },
            ]
        };

        // WORKSPACE SETUP //
        const workspace = Blockly.inject(blocklyDiv.current, {
            toolbox: toolBox,
            trashcan: true,

            // for mobile
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            },
            zoom: { // touch friendly
                controls: true,
                wheel: false,
                startScale: 0.9,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            }
        });

        // HANDLE CHANGES //
        const updateCode = () => {
            const code = javascriptGenerator.workspaceToCode(workspace);
            const output = `${code}`;
            setNasmCode(output);
        };
        workspace.addChangeListener(updateCode);

        // responsive workspace
        const handleResize = () => Blockly.svgResize(workspace);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            workspace.dispose();
        };
    }, []);

    // MAIN SIMULATION //
    const runSimulation = () => {
        
        const regs = { ...registers }; //copy of registers
        const lines = nasmCode.split("\n").map(line => line.trim()).filter(line => line.length > 0); //split lines into instructions
        console.log(lines);

        // checks for sections and if program has returned
        let isInTextSection = false;
        let hasReturned = false;

        for (let i = 0; i < lines.length; i++) {
            if (hasReturned) break; // stops code

            const line = lines[i];
            const parts = line.split(/[ ,]+/);
            const opcode = parts[0].toLowerCase(); 

            // SEGMENT CHECKING //
            if (opcode === "section") {
                const sectionName = parts[1]?.toLowerCase();
                if (sectionName === ".text" || sectionName === "text") {
                    isInTextSection = true;
                } else {
                    isInTextSection = false; 
                }
                continue;
            }

            // MNEMONICS INSIDE .text
            if (isInTextSection) {
                // MOV LOGIC
                if (parts[0] === "mov") {
                    const dest = parts[1];
                    const src = parts[2];
                    //check if valid register
                    if (regs[dest] !== undefined) {
                        if (regs[src] !== undefined) {
                            regs[dest] = regs[src];
                        } else {
                            const numValue = parseImm(src);
                            if (numValue !== null) {
                                // make sure reg doesn't exceed 64 bits using AND logic
                                regs[dest] = numValue & 0xFFFFFFFFFFFFFFFFn; 
                            }
                        }
                    }
                }

                // ADD LOGIC
                if (parts[0] === "add") {
                    const dest = parts[1];
                    const src = parts[2];
                    if (regs[src] !== undefined) {
                        regs[dest] = (regs[dest] + regs[src]) & 0xFFFFFFFFFFFFFFFFn; // prevent overflow
                    } else {
                        const numValue = parseImm(src);
                        if (numValue !== null) {
                            regs[dest] = (regs[dest] + numValue) & 0xFFFFFFFFFFFFFFFFn;
                        }
                    }
                }

                //SUB LOGIC
                if (parts[0] === "sub") {
                    const dest = parts[1];
                    const src = parts[2];
                    if (regs[src] !== undefined) {
                        regs[dest] = (regs[dest] - regs[src]) & 0xFFFFFFFFFFFFFFFFn; 
                    } else {
                        const numValue = parseImm(src);
                        if (numValue !== null) {
                            regs[dest] = (regs[dest] - numValue) & 0xFFFFFFFFFFFFFFFFn;
                        }
                    }
                }

                //INC LOGIC
                if (parts[0] === "inc") {
                    const dest = parts[1];
                    if (regs[dest] !== undefined) {
                        regs[dest]++;
                    }
                }

                //DEC LOGIC
                if (parts[0] === "dec") {
                    const dest = parts[1];
                    if (regs[dest] !== undefined) {
                        regs[dest]--;
                    }
                }

                // RETURN STATEMENT CHECKING //
                if (opcode === "ret") {
                    if (isInTextSection) {
                        hasReturned = true; // break code
                    }
                    continue;
                }
            }
        }

        // error check
        if (!isInTextSection) {
            alert("Missing .text segment. Hint: All blocks must go inside a .text segment!");
        }
        else if (!hasReturned) {
            alert("Segmentation Fault: Code fell off the end of .text without ret. Hint: add a ret before .text ends!")
        } else {
            setRegisters(regs);
        }
    };

    // Helper function for initializing two operand arithmetic operatons
    const initArithmeticBlock = (block, blockName, blockDesc) => {
        block.appendDummyInput("INPUT_ROW")
                    .appendField(blockName)
                    .appendField(new Blockly.FieldDropdown([["rax","RAX"], ["rbx","RBX"], ["rcx","RCX"], ["rdx","RDX"]]), "DEST")
                    .appendField(",")
                    .appendField(new Blockly.FieldDropdown([["rax","RAX"], ["rbx","RBX"], ["rcx","RCX"], ["rdx","RDX"], ["Custom", "CUSTOM"]]), "SRC_DROP")
                    .appendField(new Blockly.FieldLabel("0x"), "HEX_PREFIX")
                    .appendField(new Blockly.FieldTextInput("00", function(newValue) {
                        const cleaned = newValue.replace(/[^0-9a-fA-F]/g, ''); // dont allow non-hex characters
                        return cleaned.slice(0, 16); // max length at 16 hex characters
                    }), "HEX_VALUE"); 

                block.setPreviousStatement(true, null);
                block.setNextStatement(true, null);
                block.setColour(210);
                block.setTooltip(blockDesc);

                // Hide text fields for now
                block.getField("HEX_PREFIX").setVisible(false);
                block.getField("HEX_VALUE").setVisible(false);

                block.setOnChange(function(event) {
                // check for changes in MOV block
                if (event.type === Blockly.Events.BLOCK_CHANGE && event.blockId === block.id) {
                    // if change was made in drop down
                    if (event.name === "SRC_DROP") {
                        const dropdownField = block.getField("SRC_DROP");
                        const prefixField = block.getField("HEX_PREFIX");
                        const valueField = block.getField("HEX_VALUE");

                        // if custom text
                        if (event.newValue === "CUSTOM") {
                            dropdownField.setVisible(false);
                            prefixField.setVisible(true);
                            valueField.setVisible(true);
                        } else {
                            dropdownField.setVisible(true);
                            prefixField.setVisible(false);
                            valueField.setVisible(false);
                        }
                        block.render();
                    }
                }}); 
    }

    // Helper function for code generator of two operand arithmetic blocks
    const arithmeticGenerator = (block) => {
        const dest = block.getFieldValue('DEST').toLowerCase();
        const srcType = block.getFieldValue('SRC_DROP').toLowerCase();

        // get hex or register value
        let src = "";
        if (srcType === "custom") {
            src = "0x" + block.getFieldValue("HEX_VALUE");
        } else {
            src = srcType.toLowerCase();
        }
        return [dest, src];
    }

    // Helper to check if immediate value count is valid (imm8_16_32_64)
    const checkIfImmInvalid = (src) => {
        const rawHex = src.slice(2);
        const len = rawHex.length;
        
        // Valid hex digit counts: 2 (8-bit), 4 (16-bit), 8 (32-bit), 16 (64-bit)
        const validLengths = [2, 4, 8, 16];

        if (!validLengths.includes(len)) {
            alert("Invalid hex length! Immediate values must be 8, 16, 32, or 64 bits (2, 4, 8, or 16 hex characters).");
            return true;
        }
        return false;
    }

    // Helper to check if imm32 and needs sign extension
    const signExtend = (src) => {
        if (!src.startsWith("0x")) return src;

        let rawHex = src.slice(2);
        const len = rawHex.length;

        if (len == 8) { // if 32 bit
            const msbChar = rawHex.charAt(0); // Check first char
            const msbValue = parseInt(msbChar, 16);

            // If MSB >= 8, the sign bit is 1
            if (msbValue >= 8) {
                rawHex = rawHex.padStart(16, "F");
            } else {
                rawHex = rawHex.padStart(16, "0");
            }
        }
        return "0x" + rawHex;
    }

    // Helper to parse imm value into BigInt
    const parseImm = (src) => {
        if (checkIfImmInvalid(src)) return null;
        let hex = signExtend(src);
        try {
            return BigInt(hex.startsWith("0x") ? hex : "0x" + hex);
        } catch {
            return null;
        }
    };
        
    // Helper to reset registers
    const resetRegisters = () => {
        setRegisters({ rax: 0n, rbx: 0n, rcx: 0n, rdx: 0n });
    }

    // Helper to format numValues to hex
    const formatHex = (value, bits = 64) => {
        if (value === undefined) return "0x" + "0".repeat(bits / 4);
        const hexDigits = bits / 4;
        return "0x" + value.toString(16).toUpperCase().padStart(hexDigits, "0");
    };

    // MAIN // 
    return (
        //Hi gabe, just added the back button here
    <div className="flex flex-col min-h-screen bg-stone-200 p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[650px] w-full gap-4 bg-stone-100 p-3 sm:p-4 rounded-xl border border-stone-200">
            {/* workspace! */}
            <div 
                ref={blocklyDiv} 
                className="w-full lg:w-2/3 h-[400px] lg:h-full rounded border bg-white shadow-inner min-h-[350px]" 
            />
            
            {/* output display */}
            <div className="w-full lg:w-1/3 h-[450px] lg:h-full flex flex-col gap-3 overflow-y-auto">
                <h2 className="font-bold text-black mb-1">Output Display</h2>

                {/* output display: registers */}
                <div className="flex-grow bg-stone-950 text-emerald-400 p-4 font-mono text-xs rounded shadow overflow-auto whitespace-pre">
                    <h2 className="font-bold mb-2">Registers</h2>

                    {/* display all registers*/}
                    <div className="mb-3">
                        <p>RAX: {formatHex(readRegister("rax", registers), 64)}</p>
                        <p>EAX: {formatHex(readRegister("eax", registers), 32)}</p>
                        <p>AX: {formatHex(readRegister("ax", registers), 16)}</p>
                        <p>AH: {formatHex(readRegister("ah", registers), 8)}</p>
                        <p>AL: {formatHex(readRegister("al", registers), 8)}</p>
                    </div>

                    
                    <div className="mb-3">
                        <p>RBX: {formatHex(readRegister("rbx", registers), 64)}</p>
                        <p>EBX: {formatHex(readRegister("ebx", registers), 32)}</p>
                        <p>BX: {formatHex(readRegister("bx", registers), 16)}</p>
                        <p>BH: {formatHex(readRegister("bh", registers), 8)}</p>
                        <p>BL: {formatHex(readRegister("bl", registers), 8)}</p>
                    </div>

                    
                    <div className="mb-3">
                        <p>RCX: {formatHex(readRegister("rcx", registers), 64)}</p>
                        <p>ECX: {formatHex(readRegister("ecx", registers), 32)}</p>
                        <p>CX: {formatHex(readRegister("cx", registers), 16)}</p>
                        <p>CH: {formatHex(readRegister("ch", registers), 8)}</p>
                        <p>CL: {formatHex(readRegister("cl", registers), 8)}</p>
                    </div>

                    <div className="mb-3">
                        <p>RDX: {formatHex(readRegister("rdx", registers), 64)}</p>
                        <p>EDX: {formatHex(readRegister("edx", registers), 32)}</p>
                        <p>DX: {formatHex(readRegister("dx", registers), 16)}</p>
                        <p>DH: {formatHex(readRegister("dh", registers), 8)}</p>
                        <p>DL: {formatHex(readRegister("dl", registers), 8)}</p>
                    </div>

                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
            {/* run simulation button */}
            <div className="flex gap-4 mt-4">
                <button onClick={runSimulation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Run
                </button>
            </div>

            {/* reset button */}
            <div>
                <button onClick={resetRegisters} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-2 mt-4">
                    Reset
                </button>
            </div>
            
            {/* back button */}
            <div>
                <Link href="/">
                    <button className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded gap-2 mt-4">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
}
