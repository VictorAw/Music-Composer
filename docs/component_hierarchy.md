## Component Hierarchy

**AuthFormContainer**
 - AuthForm
   + Modal

**HomeContainer**
 - HeaderContainer
 - Home

**HeaderContainer**
 - Header
 - NavContainer

**NavContainer**
 - Nav

**ProfileContainer**
 - Profile
 - TrackContainer

**TrackContainer**
 - Track

**EditorContainer**
 - Editor

## Routes

| Path                            | Component           |
|---------------------------------|---------------------|
| "/sign-up"                      | "AuthFormContainer" |
| "/sign-in"                      | "AuthFormContainer" |
| "/"                             | "HomeContainer"     |
| "/user/:id                      | "ProfileContainer"  |
| "/user/:id/track/:track_id      | "TrackContainer"    |
| "/user/:id/track/:track_id/edit | "EditorContainer"   |

