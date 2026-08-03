// Registration-matching employer profile data.
// Mirrors the fields collected in app/auth/register-employer.tsx so the
// profile screen shows exactly what the employer entered during registration.

export interface EmployerProfileData {
  // Business Info
  businessName: string;
  ownerName: string;
  businessType: string;
  businessAddress: string;

  // Contact & Account
  contactNumber: string;
  email: string;

  // Verification
  verificationType: 'Business' | 'Individual';
  documents: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export const registerEmployerData: EmployerProfileData = {
  // Business Info
  businessName: "McDonald's SM North",
  ownerName: 'Juan dela Cruz',
  businessType: 'Food & Beverage',
  businessAddress: 'SM North EDSA, Quezon City',

  // Contact & Account
  contactNumber: '0917 123 4567',
  email: 'mcdonalds.smne@gmail.com',

  // Verification
  verificationType: 'Business',
  documents: ['Business Permit', 'Mayor Permit', 'Barangay Clearance'],
  verificationStatus: 'verified',
};

export const getBusinessName = (p: EmployerProfileData): string => p.businessName;

export const getOwnerInitials = (p: EmployerProfileData): string => {
  const n = p.ownerName.trim();
  if (!n) return '?';
  const words = n.split(' ');
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return n.substring(0, 2).toUpperCase();
};

// Profile completion calculation for employer:
// - Business info filled = 40%
// - Contact & account filled = 30%
// - Documents required = 20%
// - Verification = 10%
export const computeEmployerProfileCompletion = (p: EmployerProfileData): number => {
  let score = 0;
  if (p.businessName && p.ownerName && p.businessType && p.businessAddress) score += 40;
  if (p.contactNumber && p.email) score += 30;
  const requiredDocs = p.verificationType === 'Business'
    ? ['Business Permit', 'Mayor Permit', 'Barangay Clearance']
    : ['Government ID'];
  const hasAllDocs = requiredDocs.every((d) => p.documents.includes(d));
  if (hasAllDocs) score += 20;
  if (p.verificationStatus === 'verified') score += 10;
  return score;
};
