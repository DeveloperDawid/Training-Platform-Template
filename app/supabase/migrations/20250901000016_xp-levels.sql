CREATE TABLE
    xp_levels (
        level INT PRIMARY KEY,
        xp_required INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL
    );

-- Insert XP levels 1-100 with progressive difficulty curve
INSERT INTO
    xp_levels (level, xp_required, title, description)
VALUES
    -- Beginner Levels (1-10) - Quick progression to hook users
    (
        1,
        0,
        'Trainee',
        'Just starting your customer service journey'
    ),
    (
        2,
        100,
        'Novice',
        'Learning the basics of customer interaction'
    ),
    (
        3,
        250,
        'Apprentice',
        'Getting comfortable with customer conversations'
    ),
    (
        4,
        450,
        'Assistant',
        'Building confidence in problem solving'
    ),
    (
        5,
        700,
        'Associate',
        'Developing solid customer service skills'
    ),
    (
        6,
        1000,
        'Junior Specialist',
        'Showing expertise in routine cases'
    ),
    (
        7,
        1350,
        'Specialist',
        'Handling complex customer situations'
    ),
    (
        8,
        1750,
        'Senior Associate',
        'Demonstrating advanced problem-solving'
    ),
    (
        9,
        2200,
        'Expert Associate',
        'Mastering customer service fundamentals'
    ),
    (
        10,
        2700,
        'Professional',
        'Ready for challenging customer scenarios'
    ),
    -- Intermediate Levels (11-30) - Steady progression
    (
        11,
        3250,
        'Senior Professional',
        'Excelling in customer service delivery'
    ),
    (
        12,
        3850,
        'Lead Associate',
        'Guiding others through complex cases'
    ),
    (
        13,
        4500,
        'Team Lead',
        'Leading by example in customer care'
    ),
    (
        14,
        5200,
        'Senior Specialist',
        'Expertise recognized across the team'
    ),
    (
        15,
        5950,
        'Principal Associate',
        'Setting standards for service excellence'
    ),
    (
        16,
        6750,
        'Expert Professional',
        'Innovating customer service approaches'
    ),
    (
        17,
        7600,
        'Master Associate',
        'Achieving mastery in customer relations'
    ),
    (
        18,
        8500,
        'Senior Expert',
        'Exceptional skills in service delivery'
    ),
    (
        19,
        9450,
        'Principal Expert',
        'Leading complex customer initiatives'
    ),
    (
        20,
        10450,
        'Customer Champion',
        'Champion of customer satisfaction'
    ),
    (
        21,
        11500,
        'Service Virtuoso',
        'Virtuoso level customer service skills'
    ),
    (
        22,
        12600,
        'Excellence Master',
        'Master of service excellence'
    ),
    (
        23,
        13750,
        'Quality Guardian',
        'Guardian of service quality standards'
    ),
    (
        24,
        14950,
        'Experience Architect',
        'Architecting amazing customer experiences'
    ),
    (
        25,
        16200,
        'Service Innovator',
        'Innovating the future of customer service'
    ),
    (
        26,
        17500,
        'Customer Whisperer',
        'Understanding customers at the deepest level'
    ),
    (
        27,
        18850,
        'Problem Solver Supreme',
        'Supreme problem-solving capabilities'
    ),
    (
        28,
        20250,
        'Service Sage',
        'Wise in all aspects of customer care'
    ),
    (
        29,
        21700,
        'Excellence Engineer',
        'Engineering perfect customer interactions'
    ),
    (
        30,
        23200,
        'Customer Success Guru',
        'Guru of customer success strategies'
    ),
    -- Advanced Levels (31-50) - Slower progression, prestigious titles
    (
        31,
        24750,
        'Service Mastermind',
        'Mastermind of customer service strategy'
    ),
    (
        32,
        26350,
        'Experience Wizard',
        'Wizardry in customer experience design'
    ),
    (
        33,
        28000,
        'Quality Virtuoso',
        'Virtuoso performance in service quality'
    ),
    (
        34,
        29700,
        'Customer Advocate',
        'Powerful advocate for customer needs'
    ),
    (
        35,
        31450,
        'Service Luminary',
        'Luminary in the customer service field'
    ),
    (
        36,
        33250,
        'Excellence Paragon',
        'Paragon of service excellence'
    ),
    (
        37,
        35100,
        'Problem-Solving Ninja',
        'Ninja-level problem-solving skills'
    ),
    (
        38,
        37000,
        'Customer Experience Jedi',
        'Jedi master of customer experiences'
    ),
    (
        39,
        38950,
        'Service Excellence Titan',
        'Titan of service excellence'
    ),
    (
        40,
        40950,
        'Customer Success Legend',
        'Legendary status in customer success'
    ),
    (
        41,
        43000,
        'Service Prodigy',
        'Prodigious talent in customer service'
    ),
    (
        42,
        45100,
        'Experience Connoisseur',
        'Connoisseur of exceptional experiences'
    ),
    (
        43,
        47250,
        'Quality Perfectionist',
        'Perfectionist in service quality'
    ),
    (
        44,
        49450,
        'Customer Harmony Master',
        'Master of customer-business harmony'
    ),
    (
        45,
        51700,
        'Service Innovation Pioneer',
        'Pioneer of service innovation'
    ),
    (
        46,
        54000,
        'Excellence Crusader',
        'Crusader for service excellence'
    ),
    (
        47,
        56350,
        'Problem Resolution Artist',
        'Artist in problem resolution'
    ),
    (
        48,
        58750,
        'Customer Journey Architect',
        'Architect of perfect customer journeys'
    ),
    (
        49,
        61200,
        'Service Transformation Leader',
        'Leader in service transformation'
    ),
    (
        50,
        63700,
        'Customer Experience Visionary',
        'Visionary in customer experience'
    ),
    -- Expert Levels (51-75) - Significant achievements
    (
        51,
        66250,
        'Service Excellence Oracle',
        'Oracle of service excellence wisdom'
    ),
    (
        52,
        68850,
        'Customer Success Alchemist',
        'Alchemist transforming service into success'
    ),
    (
        53,
        71500,
        'Experience Design Virtuoso',
        'Virtuoso in experience design'
    ),
    (
        54,
        74200,
        'Quality Assurance Sovereign',
        'Sovereign ruler of quality assurance'
    ),
    (
        55,
        76950,
        'Customer Delight Magician',
        'Magician creating customer delight'
    ),
    (
        56,
        79750,
        'Service Strategy Mastermind',
        'Mastermind of service strategy'
    ),
    (
        57,
        82600,
        'Problem-Solving Phenomenon',
        'Phenomenon in problem-solving'
    ),
    (
        58,
        85500,
        'Customer Engagement Maestro',
        'Maestro of customer engagement'
    ),
    (
        59,
        88450,
        'Service Innovation Genius',
        'Genius in service innovation'
    ),
    (
        60,
        91450,
        'Excellence Embodiment',
        'Living embodiment of excellence'
    ),
    (
        61,
        94500,
        'Customer Experience Emperor',
        'Emperor of customer experiences'
    ),
    (
        62,
        97600,
        'Service Mastery Overlord',
        'Overlord of service mastery'
    ),
    (
        63,
        100750,
        'Quality Champion Supreme',
        'Supreme champion of quality'
    ),
    (
        64,
        103950,
        'Customer Success Deity',
        'Deity-level customer success skills'
    ),
    (
        65,
        107200,
        'Service Excellence Immortal',
        'Immortal legend in service excellence'
    ),
    (
        66,
        110500,
        'Experience Crafting God',
        'God-tier experience crafting abilities'
    ),
    (
        67,
        113850,
        'Problem Resolution Omnipotent',
        'Omnipotent problem resolution powers'
    ),
    (
        68,
        117250,
        'Customer Satisfaction Transcendent',
        'Transcendent customer satisfaction skills'
    ),
    (
        69,
        120700,
        'Service Innovation Cosmic',
        'Cosmic-level service innovation'
    ),
    (
        70,
        124200,
        'Excellence Eternal',
        'Eternal master of excellence'
    ),
    (
        71,
        127750,
        'Customer Success Infinite',
        'Infinite customer success capabilities'
    ),
    (
        72,
        131350,
        'Service Mastery Universal',
        'Universal service mastery'
    ),
    (
        73,
        135000,
        'Quality Perfection Absolute',
        'Absolute perfection in quality'
    ),
    (
        74,
        138700,
        'Customer Experience Omniscient',
        'Omniscient in customer experience'
    ),
    (
        75,
        142450,
        'Service Excellence Limitless',
        'Limitless service excellence'
    ),
    -- Master Levels (76-90) - Elite achievements
    (
        76,
        146250,
        'Customer Success Boundless',
        'Boundless customer success mastery'
    ),
    (
        77,
        150100,
        'Service Innovation Infinite',
        'Infinite service innovation'
    ),
    (
        78,
        154000,
        'Experience Design Omnipotent',
        'Omnipotent experience design'
    ),
    (
        79,
        157950,
        'Quality Mastery Transcendent',
        'Transcendent quality mastery'
    ),
    (
        80,
        161950,
        'Customer Delight Cosmic',
        'Cosmic customer delight creation'
    ),
    (
        81,
        166000,
        'Service Excellence Divine',
        'Divine service excellence'
    ),
    (
        82,
        170100,
        'Problem Resolution Celestial',
        'Celestial problem resolution'
    ),
    (
        83,
        174250,
        'Customer Success Ethereal',
        'Ethereal customer success'
    ),
    (
        84,
        178450,
        'Service Mastery Astral',
        'Astral level service mastery'
    ),
    (
        85,
        182700,
        'Excellence Avatar',
        'Avatar of pure excellence'
    ),
    (
        86,
        187000,
        'Customer Experience Nirvana',
        'Achieved customer experience nirvana'
    ),
    (
        87,
        191350,
        'Service Innovation Enlightened',
        'Enlightened service innovation'
    ),
    (
        88,
        195750,
        'Quality Perfection Zen',
        'Zen master of quality perfection'
    ),
    (
        89,
        200200,
        'Customer Success Enlightenment',
        'Enlightenment in customer success'
    ),
    (
        90,
        204700,
        'Service Excellence Buddha',
        'Buddha of service excellence'
    ),
    -- Legendary Levels (91-100) - Ultimate achievements
    (
        91,
        209250,
        'Customer Experience Sage',
        'Sage of all customer experience'
    ),
    (
        92,
        213850,
        'Service Mastery Prophet',
        'Prophet of service mastery'
    ),
    (
        93,
        218500,
        'Excellence Messiah',
        'Messiah of service excellence'
    ),
    (
        94,
        223200,
        'Customer Success Savior',
        'Savior of customer success'
    ),
    (
        95,
        227950,
        'Service Innovation Messiah',
        'Messiah of service innovation'
    ),
    (
        96,
        232750,
        'Quality Perfection Saint',
        'Saint of quality perfection'
    ),
    (
        97,
        237600,
        'Customer Delight Angel',
        'Angel of customer delight'
    ),
    (
        98,
        242500,
        'Service Excellence Archangel',
        'Archangel of service excellence'
    ),
    (
        99,
        247450,
        'Customer Success Seraph',
        'Seraph of customer success'
    ),
    (
        100,
        252450,
        'Service Mastery Supreme Being',
        'Supreme being of service mastery'
    );

-- Indexes for xp_levels
create index if not exists idx_xp_levels_level on public.xp_levels (level);

create index if not exists idx_xp_levels_xp_required on public.xp_levels (xp_required);

create index if not exists idx_xp_levels_title on public.xp_levels (title);

-- Revoke all on xp_levels table from authenticated and service_role
revoke all on public.xp_levels
from
    authenticated,
    service_role;

-- Open up access to xp_levels (read-only for users)
grant
select
    on table public.xp_levels to authenticated,
    service_role;

-- RLS for xp_levels
alter table public.xp_levels enable row level security;

-- Allow all users to read xp_levels (it's reference data)
create policy "Users can view xp levels" on public.xp_levels for
select
    using (true);