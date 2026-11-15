import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch, FaChevronDown } from 'react-icons/fa';
import './TenantSearchBar.css';

const tenantTypes = [
  { label: 'Girls', value: 'female', emoji: '🚺', desc: 'Only for girls' },
  { label: 'Boys', value: 'male', emoji: '🚹', desc: 'Only for boys' },
  { label: 'Unisex', value: 'unisex', emoji: '⚧️', desc: 'Open to all' },
];

const budgetOptions = [
  { label: 'Below ₹5,000', value: [1000, 5000] },
  { label: '₹5,000 - ₹10,000', value: [5000, 10000] },
  { label: '₹10,000 - ₹20,000', value: [10000, 20000] },
  { label: 'Above ₹20,000', value: [20000, 50000] },
];

const suggestedDestinations = [
  { icon: '🏙️', label: 'Pune City, Maharashtra', desc: 'Central Pune' },
  { icon: '🏢', label: 'Hinjewadi, Pune', desc: 'IT hub, Pune' },
  { icon: '🏢', label: 'Wakad, Pune', desc: 'Residential & IT area' },
  { icon: '🏢', label: 'Baner, Pune', desc: 'Popular for students & professionals' },
  { icon: '🏢', label: 'Aundh, Pune', desc: 'Prime residential area' },
  { icon: '🏢', label: 'Kothrud, Pune', desc: 'Well-connected suburb' },
  { icon: '🏢', label: 'Viman Nagar, Pune', desc: 'Near airport & IT parks' },
  { icon: '🏢', label: 'Kharadi, Pune', desc: 'IT & business hub' },
  { icon: '🏢', label: 'Pimpri, PCMC', desc: 'Industrial & residential' },
  { icon: '🏢', label: 'Chinchwad, PCMC', desc: 'Industrial & residential' },
  { icon: '🏢', label: 'Nigdi, PCMC', desc: 'Residential area' },
  { icon: '🏢', label: 'Ravet, PCMC', desc: 'Emerging residential area' },
  { icon: '🏢', label: 'Pimple Saudagar, PCMC', desc: 'Popular for families' },
  { icon: '🏢', label: 'Pimple Gurav, PCMC', desc: 'Residential area' },
  { icon: '🏢', label: 'Thergaon, PCMC', desc: 'Residential area' },
  { icon: '🏢', label: 'Akurdi, PCMC', desc: 'Residential & industrial' },
  { icon: '🏢', label: 'Bhosari, PCMC', desc: 'Industrial area' },
  { icon: '🏢', label: 'Tathawade, Pune', desc: 'Student & IT area' },
  { icon: '🏢', label: 'Balewadi, Pune', desc: 'Sports & residential' },
  { icon: '🏢', label: 'Hadapsar, Pune', desc: 'IT & industrial area' },
  { icon: '🏢', label: 'Magarpatta, Pune', desc: 'IT & residential' },
  { icon: '🏢', label: 'Koregaon Park, Pune', desc: 'Lifestyle & nightlife' },
  { icon: '🏢', label: 'Camp, Pune', desc: 'Central business area' },
  { icon: '🏢', label: 'Swargate, Pune', desc: 'Transport hub' },
  { icon: '🏢', label: 'Sinhagad Road, Pune', desc: 'Residential area' },
  { icon: '🏢', label: 'Erandwane, Pune', desc: 'Educational hub' },
  { icon: '🏢', label: 'Karve Nagar, Pune', desc: 'Residential area' },
  { icon: '🏢', label: 'Bavdhan, Pune', desc: 'Residential & nature' },
  { icon: '🏢', label: 'Kalyani Nagar, Pune', desc: 'Upmarket area' },
  { icon: '🏢', label: 'Dhanori, Pune', desc: 'Emerging residential' },
  { icon: '🏢', label: 'Moshi, PCMC', desc: 'Industrial & residential' },
];

const TenantSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [tenantType, setTenantType] = useState('');
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [budget, setBudget] = useState([3000, 20000]);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const tenantPanelRef = useRef(null);
  const locationPanelRef = useRef(null);
  const budgetPanelRef = useRef(null);

  // Handle location input
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Click outside logic for tenant panel
  useEffect(() => {
    if (!showTenantDropdown) return;
    const handleClickOutside = (event) => {
      if (tenantPanelRef.current && !tenantPanelRef.current.contains(event.target)) {
        setShowTenantDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTenantDropdown]);

  // Click outside logic for location panel
  useEffect(() => {
    if (!showLocationPanel) return;
    const handleClickOutside = (event) => {
      if (locationPanelRef.current && !locationPanelRef.current.contains(event.target)) {
        setShowLocationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLocationPanel]);

  // Click outside logic for budget panel
  useEffect(() => {
    if (!showBudgetDropdown) return;
    const handleClickOutside = (event) => {
      if (budgetPanelRef.current && !budgetPanelRef.current.contains(event.target)) {
        setShowBudgetDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBudgetDropdown]);

  // Handle tenant type dropdown
  const handleTenantType = (type) => {
    setTenantType(type);
    setShowTenantDropdown(false);
  };

  // Handle budget dropdown
  const handleBudgetDropdown = (range) => {
    setBudget(range);
    setShowBudgetDropdown(false);
  };

  // Clear all filters
  const handleClear = () => {
    setLocation('');
    setTenantType('');
    setBudget([3000, 20000]);
  };

  // Search action
  const handleSearch = () => {
    if (location && !recentSearches.includes(location)) {
      setRecentSearches([location, ...recentSearches.slice(0, 2)]);
    }
    if (onSearch) {
      console.log('Search triggered with:', { location, tenantType, budget });
      onSearch({ location, tenantType, budget });
    }
  };

  return (
    <div className="tenant-search-bar sectioned wide-bar">
      <div className="search-row sectioned-row">
        {/* Location Cell */}
        <div className="search-cell location-cell">
          <div className="cell-label">Where</div>
          <div className="cell-value location-value">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setShowLocationPanel(true)}
              className="location-input"
              autoComplete="off"
            />
          </div>
          {showLocationPanel && (
            <>
              <div className="tenant-panel-backdrop" />
              <div className="location-panel-dropdown floating" ref={locationPanelRef}>
                <div className="location-panel-title">Suggested destinations</div>
                {suggestedDestinations.map((dest, i) => (
                  <div
                    key={dest.label}
                    className="location-panel-option"
                    onMouseDown={() => { setLocation(dest.label); setShowLocationPanel(false); }}
                  >
                    <span className="location-panel-icon">{dest.icon}</span>
                    <span className="location-panel-label">{dest.label}</span>
                    <span className="location-panel-desc">{dest.desc}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="vertical-divider" />
        {/* Tenant Type Panel Dropdown Cell */}
        <div className="search-cell tenant-type-cell">
          <div className="cell-label">Who</div>
          <div
            className={`cell-value tenant-type-panel${tenantType ? '' : ' empty'}`}
            onClick={() => setShowTenantDropdown(v => !v)}
            tabIndex={0}
            style={{ cursor: 'pointer', background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <span style={{ color: tenantType ? '#232323' : '#bbb', fontStyle: tenantType ? 'normal' : 'italic' }}>
              {tenantType ? tenantTypes.find(t => t.value === tenantType).emoji + ' ' + tenantTypes.find(t => t.value === tenantType).label : 'Select Gender'}
            </span>
          </div>
          {showTenantDropdown && (
            <>
              <div className="tenant-panel-backdrop" />
              <div className="tenant-panel-dropdown floating" ref={tenantPanelRef} style={{ minWidth: '180px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(255, 153, 0, 0.15)' }}>
                {tenantTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`tenant-panel-option${tenantType === type.value ? ' selected' : ''}`}
                    onMouseDown={() => handleTenantType(type.value)}
                    style={{ padding: '0.7rem 1.2rem', borderRadius: '8px', margin: '0.2rem 0', background: tenantType === type.value ? 'orange' : '#fff', color: tenantType === type.value ? '#fff' : '#232323', fontWeight: tenantType === type.value ? 700 : 500, cursor: 'pointer', transition: 'background 0.18s, color 0.18s' }}
                  >
                    <span className="tenant-panel-emoji">{type.emoji}</span>
                    <span className="tenant-panel-label">{type.label}</span>
                    <span className="tenant-panel-desc" style={{ marginLeft: '0.5rem', fontSize: '0.95em', color: tenantType === type.value ? '#fff' : '#888' }}>{type.desc}</span>
                    {tenantType === type.value && <span className="tenant-panel-radio" />}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="vertical-divider" />
        {/* Budget Dropdown Cell */}
        <div className="search-cell budget-cell">
          <div className="cell-label">Budget</div>
          <div className="cell-value budget-dropdown" onClick={() => setShowBudgetDropdown(v => !v)} tabIndex={0} style={{ cursor: 'pointer', background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <span style={{ color: budget ? '#232323' : '#bbb', fontStyle: budget ? 'normal' : 'italic' }}>
              {budgetOptions.find(opt => opt.value[0] === budget[0] && opt.value[1] === budget[1])?.label || 'Select budget'}
            </span>
            <FaChevronDown className="dropdown-arrow" />
          </div>
          {showBudgetDropdown && (
            <>
              <div className="tenant-panel-backdrop" />
              <div className="tenant-panel-dropdown floating" ref={budgetPanelRef} style={{ minWidth: '200px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(255, 153, 0, 0.15)' }}>
                {budgetOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="tenant-panel-option"
                    onMouseDown={() => handleBudgetDropdown(opt.value)}
                    style={{ padding: '0.7rem 1.2rem', borderRadius: '8px', margin: '0.2rem 0', background: (budget[0] === opt.value[0] && budget[1] === opt.value[1]) ? 'orange' : '#fff', color: (budget[0] === opt.value[0] && budget[1] === opt.value[1]) ? '#fff' : '#232323', fontWeight: (budget[0] === opt.value[0] && budget[1] === opt.value[1]) ? 700 : 500, cursor: 'pointer', transition: 'background 0.18s, color 0.18s' }}
                  >
                    <span className="tenant-panel-label">{opt.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Search Button Cell */}
        <div className="search-cell search-btn-cell">
          { !showTenantDropdown && (
            <>
              <button className="search-btn" onClick={handleSearch} style={{ backgroundColor: 'orange', color: '#fff' }}>
                <FaSearch className="search-btn-icon" />
                Search
              </button>
              <button className="clear-filters-btn" onClick={handleClear} title="Clear all filters">
                Clear
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantSearchBar; 