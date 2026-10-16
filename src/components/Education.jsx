import React from 'react';

export default function Education() {
  return (
    <section
      id="education"
      data-section-id="experience"
      className="w-screen min-w-[100vw] h-[100dvh] shrink-0 snap-start snap-always flex flex-col justify-between pt-16 pb-16 pl-14 sm:pl-20 md:pl-28 lg:pl-32 pr-8 sm:pr-12 md:pr-16 border-r border-[#36332F] bg-[#1C1B18] relative overflow-hidden"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-3 border-b border-[#36332F]">
        <span className="text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          03 — ACADEMIC JOURNEY
        </span>
        <span className="text-xs font-mono tracking-widest text-[#8C8880] uppercase hidden sm:inline">
          UNIVERSITAS BANI SALEH • S1 SISTEM INFORMASI
        </span>
      </div>

      {/* Main Content Area: Single Degree Spotlight */}
      <div className="my-auto w-full max-w-7xl space-y-4">
        {/* Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end pb-3 border-b border-[#36332F]">
          <div className="lg:col-span-8">
            <h2 className="font-serif-display text-[clamp(34px,5vw,72px)] text-[#ECE8E1] font-normal tracking-tight uppercase leading-[0.85]">
              ACADEMIC <br /> JOURNEY
            </h2>
          </div>
          <div className="lg:col-span-4 text-[11px] font-mono text-[#8C8880] uppercase leading-relaxed tracking-wider">
            ✦ HIGHER EDUCATION & ACADEMIC STANDING IN SARJANA SISTEM INFORMASI AT UNIVERSITAS BANI SALEH.
          </div>
        </div>

        {/* Focused S1 Degree Editorial Card & Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: Main Degree Overview */}
          <div className="lg:col-span-7 bg-[#23221E] border border-[#36332F] p-4 sm:p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-serif-display text-2xl sm:text-3xl text-[#D5CEC4] font-normal block">
                2023 — 2027
              </span>

              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#ECE8E1] leading-tight font-normal">
                Sarjana Sistem Informasi (S.Kom)
              </h3>

              <p className="font-mono text-xs text-[#8C8880] uppercase tracking-wider">
                Universitas Bani Saleh • Bekasi, Jawa Barat
              </p>
            </div>

            <p className="font-mono text-xs text-[#D5CEC4] leading-relaxed border-t border-[#36332F] pt-3">
              Focusing on Enterprise Information Systems, Software Architecture, Relational Database Schemas, and User Experience Engineering.
            </p>
          </div>

          {/* Right Column: Academic Specifications Table */}
          <div className="lg:col-span-5 bg-[#23221E] border border-[#36332F] p-4 sm:p-6 space-y-3 flex flex-col justify-between font-mono text-xs">
            <div className="pb-2 border-b border-[#36332F]">
              <span className="text-[9px] text-[#8C8880] uppercase tracking-widest block">
                DEGREE SPECIFICATION
              </span>
              <h4 className="font-serif-display text-xl text-[#ECE8E1] uppercase">
                ACADEMIC STANDING
              </h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-[#36332F]/60">
                <span className="text-[#8C8880]">INSTITUTION</span>
                <span className="text-[#ECE8E1] font-medium">Universitas Bani Saleh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#36332F]/60">
                <span className="text-[#8C8880]">FACULTY</span>
                <span className="text-[#ECE8E1]">Faculty of Information Systems</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#36332F]/60">
                <span className="text-[#8C8880]">CUMULATIVE GPA</span>
                <span className="text-[#D5CEC4] font-bold">3.62 / 4.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#36332F]/60">
                <span className="text-[#8C8880]">TOTAL CREDITS</span>
                <span className="text-[#ECE8E1]">110 SKS</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C8880]">STATUS</span>
                <span className="text-[#D5CEC4] font-semibold">Active Student</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-2 border-t border-[#36332F] flex justify-between items-center text-[10px] font-mono text-[#8C8880] uppercase tracking-wider">
        <span>SARJANA SISTEM INFORMASI (S.KOM) • UNIVERSITAS BANI SALEH</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}






