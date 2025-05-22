# Poker Tracker Geo - Deployment Guide

## Overview
This document outlines the process for deploying the Poker Tracker Geo application for user testing. It covers both iOS and Android deployment methods, configuration requirements, and user access instructions.

## Deployment Checklist

### Pre-Deployment Tasks
- [x] Complete all critical refinements
- [x] Test application on target platforms
- [x] Prepare documentation and user guide
- [x] Create user testing accounts
- [ ] Configure analytics for user testing
- [ ] Prepare feedback collection mechanism

### Deployment Environments
- TestFlight for iOS users
- Firebase App Distribution for Android users
- Expo updates for rapid iterations

## iOS Deployment via TestFlight

### Requirements
- Apple Developer Account
- App Store Connect access
- Xcode 13+ installed
- Valid provisioning profiles and certificates

### Build Process
1. **Export from Expo**
   ```bash
   cd /home/ubuntu/poker-tracker-geo/PokerTrackerGeo
   expo build:ios
   ```

2. **Configure in Xcode**
   - Open the exported .xcworkspace file in Xcode
   - Set Bundle Identifier: com.pokertrackergeo.app
   - Set Version: 0.9.0 (Beta)
   - Set Build: 1

3. **Archive and Upload**
   - Select "Generic iOS Device" as the build target
   - Select Product > Archive
   - In the Organizer, click "Distribute App"
   - Select "App Store Connect" and follow the prompts
   - Upload the build to TestFlight

### TestFlight Configuration
1. Log in to App Store Connect
2. Navigate to the Poker Tracker Geo app
3. Configure TestFlight information:
   - Add test information and what to test
   - Set up external testing group "Beta Testers"
   - Add test users by email

## Android Deployment via Firebase

### Requirements
- Google Play Console access
- Firebase project configured
- Java Development Kit (JDK) 11+
- Android keystore for signing

### Build Process
1. **Export from Expo**
   ```bash
   cd /home/ubuntu/poker-tracker-geo/PokerTrackerGeo
   expo build:android -t app-bundle
   ```

2. **Configure Firebase**
   - Log in to Firebase Console
   - Create a new project (if not already created)
   - Add Android app with package name: com.pokertrackergeo.app
   - Download google-services.json and place in android/app/

3. **Upload to Firebase App Distribution**
   - Navigate to App Distribution in Firebase Console
   - Upload the generated .aab file
   - Create a testing group "Beta Testers"
   - Add testers by email

## Expo Updates Configuration

### Setup for OTA Updates
1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "Poker Tracker Geo",
       "slug": "poker-tracker-geo",
       "version": "0.9.0",
       "orientation": "portrait",
       "updates": {
         "enabled": true,
         "fallbackToCacheTimeout": 0,
         "checkAutomatically": "ON_LOAD"
       }
     }
   }
   ```

2. **Publish Updates**
   ```bash
   cd /home/ubuntu/poker-tracker-geo/PokerTrackerGeo
   expo publish
   ```

## Database Configuration

### Supabase Setup
1. **Initialize Tables**
   - Users table
   - Sessions table
   - PokerRooms table
   - UserPreferences table

2. **Configure Access Rules**
   - Set up row-level security
   - Configure authentication providers
   - Set up API access

3. **Environment Variables**
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

## User Access Instructions

### iOS TestFlight Users
1. Receive email invitation to test Poker Tracker Geo
2. Download TestFlight from App Store (if not already installed)
3. Accept the invitation and install the app
4. Use the provided test account or create a new account
5. Follow the in-app tutorial to get started

### Android Firebase Users
1. Receive email invitation to test Poker Tracker Geo
2. Click the download link in the email
3. Follow instructions to install the app
4. Use the provided test account or create a new account
5. Follow the in-app tutorial to get started

## Test Accounts

### Admin Account
- Email: admin@pokertrackergeo.com
- Password: PTG_admin_2025

### Test User Accounts
- Email: tester1@pokertrackergeo.com
- Password: PTG_test_2025

- Email: tester2@pokertrackergeo.com
- Password: PTG_test_2025

## Monitoring and Feedback

### Analytics Integration
- Firebase Analytics for usage patterns
- Crashlytics for error reporting
- Custom events for feature usage tracking

### Feedback Collection
- In-app feedback form
- TestFlight feedback mechanism
- Firebase App Distribution feedback
- Dedicated feedback email: feedback@pokertrackergeo.com

## Rollback Plan

### In Case of Critical Issues
1. Identify the issue and its severity
2. For minor issues: Push an update via Expo
3. For major issues:
   - Disable the problematic feature
   - Push an update via Expo
   - If necessary, remove the app from testing

### Version Control
- Maintain tagged releases in Git
- Document all changes between versions
- Keep previous builds available for rollback

## Post-Deployment Tasks
- Monitor crash reports and analytics
- Collect and categorize user feedback
- Prioritize issues for immediate fixes
- Schedule regular update cycles during testing

## Timeline
- Initial deployment: May 22, 2025
- First feedback collection: May 29, 2025
- Iteration updates: Weekly as needed
- Testing period conclusion: June 19, 2025
