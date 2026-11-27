// Copyright Epic Games, Inc. All Rights Reserved.
// Actual source excerpts for discussion; separate regions, not a translation unit.
// Median split: DecalSpatialIndex.cpp:90-96.
                    const int32 Mid=First+Count/2;
                    std::nth_element(S->LeafPermutation.GetData()+First,S->LeafPermutation.GetData()+Mid,S->LeafPermutation.GetData()+First+Count,
                        [&S,Axis](int32 A,int32 B)
                        {
                            const double X=S->Entries[A].Center[Axis],Y=S->Entries[B].Center[Axis];
                            return X==Y ? A<B : X<Y;
                        });
// Whole-node rejection: DecalSpatialIndex.cpp:165-174.
                if (!First.IntersectBox(Node.Center,Node.Extent) && !(Second && Second->IntersectBox(Node.Center,Node.Extent))) continue;
                if (Node.Count>0)
                {
                    for (int32 I=Node.First; I<Node.First+Node.Count; ++I) R.Ordinals.Add(LeafPermutation[I]);
                }
                else
                {
                    check(Stack.Num()+2<=64);
                    Stack.Add(Node.Right); Stack.Add(Node.Left);
                }
// Snapshot reuse: DecalRenderingShared.cpp:115-116,128-129,132.
        if (!DecalSpatialSnapshot.IsValid())
        {
// Geometry and proxy collection omitted here.
            DecalSpatialSnapshot=UE::S04Decals::FSnapshot::Build(Geometry,DecalSpatialRevision,
                DecalSpatialPrepareSerial,DecalSpatialMode!=3,DecalSpatialLeafCapacity,Proxies);
        }
// Restore scene order: DecalSpatialIndex.cpp:180.
        R.Ordinals.Sort();
