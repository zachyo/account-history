# Stacks Block Explorer - Enhancement Requirements

## Project Context
This is a Stacks blockchain mini block explorer built following the LearnWeb3 tutorial. The app allows users to explore blocks, transactions, and addresses on the Stacks blockchain.

## Current Functionality
- Block exploration with transaction details
- Address lookup functionality
- Basic transaction display
- Connected to Stacks API endpoints

## Required Improvements

### 1. Mobile Responsive Design
**Objective**: Make the interface fully responsive and touch-optimized

**Requirements**:
- Implement responsive breakpoints for mobile, tablet, and desktop
- Optimize touch targets (minimum 44px touch areas)
- Ensure tables/data display properly on small screens (consider horizontal scroll or card layouts)
- Add mobile-friendly navigation patterns
- Test on various screen sizes (320px to 1920px+)
- Implement swipe gestures where appropriate

**Technical Notes**:
- Use CSS Grid/Flexbox for responsive layouts
- Consider mobile-first approach
- Optimize font sizes and spacing for mobile

### 2. Network Toggle (Mainnet/Testnet)
**Objective**: Allow users to switch between Stacks mainnet and testnet

**Requirements**:
- Add toggle switch in the header/navigation
- Update API endpoints dynamically based on selected network
- Store network preference in localStorage
- Clear/reset data when switching networks
- Visual indicator showing current network
- Default to mainnet on first visit

**API Endpoints**:
- Mainnet: `https://api.hiro.so`
- Testnet: `https://api.testnet.hiro.so`

### 3. Export Tools
**Objective**: Enable users to export wallet transaction data

**Requirements**:
- Add export buttons for CSV and JSON formats
- Export functionality for:
  - Wallet transaction history

- Include relevant fields: transaction ID, block height, timestamp, amount, sender, recipient, transaction type
- Generate downloadable files with appropriate naming convention
- Add loading states during export generation

**Export Format Examples**:
```csv
tx_id,block_height,timestamp,amount,sender,recipient,type
0x123...,85000,2024-01-01T12:00:00Z,1000000,SP123...,SP456...,token_transfer
```

### 4. STX Balance Display
**Objective**: Show STX balance for addresses

**Requirements**:
- Display current STX balance when viewing an address
- Show balance in microSTX and STX (formatted)
- Include locked/unlocked balance breakdown if available
- Add balance refresh functionality
- Handle loading and error states
- Position prominently in address view

**API Integration**:
- Use Stacks API account endpoints
- Format microSTX to STX (1 STX = 1,000,000 microSTX)
- Handle edge cases (zero balance, network errors)

## Technical Specifications

### Framework Compatibility
- Should work with existing Next.js setup
- Maintain current state management approach
- Use existing styling methodology (CSS modules/Tailwind/styled-components)

### Performance Considerations
- Lazy load export functionality
- Optimize mobile performance
- Cache network preferences
- Debounce API calls where appropriate

### Error Handling
- Graceful degradation for network issues
- User-friendly error messages
- Retry mechanisms for failed requests

### Accessibility
- Maintain WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Implementation Priority
1. Mobile Responsive Design (Foundation)
2. STX Balance Display (Core feature)
3. Network Toggle (Enhanced functionality)
4. Export Tools (Advanced feature)

## Files Likely to Modify
- Layout components for responsive design
- API utility functions for network switching
- Address/wallet view components for balance display
- New export utility functions
- CSS/styling files for mobile optimization